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

  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel, filterModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;


    //при изменении модели вызывается обработччик
    this.#pointsModel.addObserver(this.#handleModelEvent); //проверить этот обработчик
    this.#filterModel.addObserver(this.#handleFilterModelEvent);
  }

  get points() {
    const filterType = this.#filterModel.get();

    const filteredPoints = filter[filterType](this.#pointsModel.get());
    return sort[this.#currentSortType](filteredPoints);
  }

  init() {
    this.#points = sort[SortTypes.DAY]([...this.#pointsModel.get()]);
    this.#pointDestination = [...this.#destinationsModel.get()];
    this.#pointOffers = [...this.#offersModel.get()];

    this.#newPointButton = new TripEventNewButton({onNewPointCreateButton: this.#newPointButtonClickHandler});
    render(this.#newPointButton, this.#tripMainContainer);
    render(new TripEventInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    this.#renderBoard();
    this.#renderPoints(this.#points);
    this.#renderNoPoint();
    this.#renderNewPoint();
  }

  #clearBoard({ resetSortType = false } = {}) {

    this.#pointPresentors.forEach((presentor) => presentor.destroy());
    this.#pointPresentors.clear();

    remove(this.#tripEventNoPointComponent);
    remove(this.#messageComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }


  #handleViewAction = (actonType, updateType, update) => {
    switch(actonType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.update(updateType, update);
        break;

      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;

      case UserAction.DELETE_POINT:
        this.#points.delete(updateType, update);
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
