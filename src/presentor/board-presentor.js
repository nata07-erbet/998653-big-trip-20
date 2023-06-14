import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventSortView from '../view/trip-sort.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import TripEventNoPointView from '../view/trip-no-point.js';
// import TripEventAddView from '../view/trip-event-add.js';
import PointPresentor from './point-presentor.js';
import { sort } from '../utils/sort.js';
import { filter } from '../utils/filter.js';
import { SortTypes, UpdateType, UserAction} from '../constants/const.js';


export default class BoardPresentor {
  #tripMainContainer = null;
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

  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel, filterModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    //при изменении модели вызывается обработччик
    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
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

    render(new TripEventInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    this.#renderBoard();
    this.#renderPoints(this.#points);
    this.#renderNoPoint();
    // this.#renderNewPoint();
  }

  #clearBoard({ resetSortType = false } = {}) { //что за запись?

    this.#pointPresentors.forEach((presentor) => presentor.destroy());
    this.#pointPresentors.clear();

    // remove(this.#sortComponent);
    remove(this.#tripEventNoPointComponent);

    if (resetSortType) {
      this.#currentSortType = SortTypes.DAY;
    }
  }


  #handleViewAction = (actonType, updateType, update) => {
    //действия пользователя, которые приводят к изменению модели
    switch(actonType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updateTask(updateType, update);
        break;

      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;

      case UserAction.DELETE_POINT:
        this.#points.delete(updateType, update);
        break;
    }
  };

  //обработчик, срабатывающий на измененении модели
  //обновленные данные берем из модели this._notify(updateType, update)
  //в зависимости от типа решаем что перерисовывать
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

  #renderSort() {
    this.#sortComponent = new TripEventSortView({
      currentSortType: this.#currentSortType,
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange});

    render(this.#sortComponent, this.#tripEventsContainer);
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
    if(this.#points.length === 0) {
      render(this.#tripEventNoPointComponent, this.#tripEventsContainer);
    }
  }

  // #renderNewPoint() {
  //   const tripEventAddComponent = new TripEventAddView({
  //     point: this.#points[0],
  //     pointDestinations: this.#destinationsModel.get(),
  //     pointOffers: this.#offersModel.get()
  //   });
  //   render (tripEventAddComponent, this.#tripEventsContainer);
  // }

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#points = sort[this.#currentSortType](this.#points);
  };

  // #clearPointList() {
  //   this. #pointPresentors.forEach((pointPresentontor) => pointPresentontor.destroy());
  //   this.#pointPresentors.clear();
  //   remove(this.editform)
  // }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    // this.#clearPointList();
    // this.#renderPointsList();
    this.#clearBoard();
    this.#renderBoard();
    this.#renderPoints(this.#points);
  };

  #handleModeChange = () => {
    this.#pointPresentors.forEach((presentor) => presentor.resetView());
  };

  #modelEventHandler = (evt) => {
    evt.prevent.Default();
  };
  //заглушка

}
