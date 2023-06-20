import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventSortView from '../view/trip-sort.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import TripEventNoPointView from '../view/trip-no-point.js';
import PointPresentor from './point-presentor.js';
import { sort } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import { FilterTypes, SortTypes, UpdateType, UserAction} from '../constants/const.js';
import NewPointPresentor from './new-point-presentor.js';
import TripEventNewButton from '../view/trip-event-new-button.js';
import TripEvevntMessageView from '../view/trip-event-message-view.js';
import TripEventLoadingComponent from '../view/trip-event-loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};


export default class BoardPresentor {
  #tripMainContainer = null;
  #newPointButtonContainer = null;
  #tripEventsContainer = null;

  #destinationsModel = null;
  #pointDestination = null;
  #pointOffers = null;
  #offersModel = null;
  #pointsModel = null;
  #filterModel = null;
  #points = null;

  #tripEventListComponent = new TripEventListView();
  #tripEventNoPointComponent = new TripEventNoPointView();

  #sortComponent = null;
  #currentSortType = SortTypes.DAY;

  #pointPresentors = new Map();
  #newPointPresentor = null;
  #newPointButton = null;
  #isCreating = false;
  #messageComponent = null;
  #isLoading = true;
  #loadingComponent = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel, filterModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleFilterModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.get();

    const filteredPoints = filter[filterType](this.#pointsModel.get());
    return sort[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#newPointButton = new TripEventNewButton({onNewPointCreateButton: this.#newPointButtonClickHandler});
    render(this.#newPointButton, this.#tripMainContainer);
    render(new TripEventInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderAllBoard();
    this.#renderNewPoint();
  }

  #onDataLoad() {
    this.#points = sort[SortTypes.DAY]([...this.#pointsModel.get()]);
    this.#pointDestination = [...this.#destinationsModel.get()];
    this.#pointOffers = [...this.#offersModel.get()];

    this.#renderAllBoard();
  }

  #clearBoard({ resetSortType = false } = {}) {

    this.#pointPresentors.forEach((presentor) => presentor.destroy());
    this.#pointPresentors.clear();

    remove(this.#tripEventNoPointComponent);
    remove(this.#messageComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }


  #handleViewAction = async (actonType, updateType, update) => {
    this.#uiBlocker.block();
    switch(actonType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresentors.get(update.id).setSaving();
        try{
          await this.#pointsModel.updatePoint(updateType, update);
        }catch(err) {
          this.#pointPresentors.get(update.id).setAborting();
        }
        break;

      case UserAction.ADD_POINT:
        this.#newPointPresentor.get(update.id).setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresentor.setAborting();
        }
        break;

      case UserAction.DELETE_POINT:
        this.#pointPresentors.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresentors.get(update.id).setAborting();
        }
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#pointPresentors.get(data.id).init(data);
        break;

      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;

      case UpdateType.MAJOR:
        this.#clearBoard({resetRenderPointCount: true, resetSortType: true});
        this.#renderBoard();
        break;

      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#onDataLoad();
        break;

    }
  };

  #handleFilterModelEvent = (filterType) => {
    const filteredPoints = filter[filterType](this.#pointsModel.get());
    this.#points = sort[this.#currentSortType](filteredPoints);
    this.#clearBoard();
    this.#renderBoard();

    if (this.#points.length === 0) {
      this.#renderMessage();
    } else {
      this.#renderPoints(this.#points);
    }
  };

  #renderSort() {
    this.#sortComponent = new TripEventSortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange});

    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderMessage() {
    this.#messageComponent = new TripEvevntMessageView({
      filterType:this.#filterModel.get()
    });

    render(this.#messageComponent, this.#tripEventsContainer);
  }

  #renderAllBoard(){
    if(this.#isLoading) {
      this.#renderLoading();

    } else {
      if(!this.#points.length && !this.#isCreating) {
        this.#renderNoPoint();
      } else {
        this.#renderSort();
        this.#renderBoard();
        this.#renderPoints(this.#points);
      }
    }
  }

  #renderLoading() {
    this.#loadingComponent = new TripEventLoadingComponent();
    render(this.#loadingComponent, this.#tripEventsContainer);
  }

  #renderBoard() {
    render (this.#tripEventListComponent, this.#tripEventsContainer);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      const pointPresentor = new PointPresentor({
        tripEventListComponent: this.#tripEventListComponent.element,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        onModeChange: this.#handleModeChange,
        onDataChange: this.#handleViewAction
      });
      pointPresentor.init(point);
      this.#pointPresentors.set(point.id, pointPresentor);
    });
  }

  #renderNoPoint() {
    if(this.#points.length === 0 && !this.#isCreating) {
      this.#renderMessage();
    }
  }

  #renderNewPoint() {
    this.#newPointPresentor = new NewPointPresentor({
      buttonContainer: this.#tripMainContainer,
      container: this.#tripEventsContainer,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onClose: this.#newPointDestroyHandler
    });

  }

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#points = sort[this.#currentSortType](this.#points);
  };


  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearBoard();
    this.#renderBoard();
    this.#renderPoints(this.#points);
  };

  #handleModeChange = () => {
    this.#pointPresentors.forEach((presentor) => presentor.resetView());
    this.#newPointPresentor.destroy();
  };

  #newPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortType = SortTypes.DAY;
    this.#filterModel.setFilter(FilterTypes.EVERYTHING);
    this.#newPointButton.setDisabled(true);
    this.#newPointPresentor.init();
  };

  #newPointDestroyHandler = (isCanceled) => {
    this.#isCreating = false;
    this.#newPointButton.setDisabled(false);
    if(isCanceled && this.points.length === 0) {
      remove(this.#sortComponent);
      this.#sortComponent = null;
      this.#renderMessage();
    }
  };
}
