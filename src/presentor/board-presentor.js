import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventSortView from '../view/trip-sort.js';
import {render, RenderPosition} from '../framework/render.js';
import TripEventNoPointView from '../view/trip-no-point.js';
// import TripEventAddView from '../view/trip-event-add.js';
import PointPresentor from './point-presentor.js';
import {updateItem} from '../utils/utils.js';
import {sort} from '../utils/sort.js';
import { SortTypes } from '../constants/const.js';


export default class BoardPresentor {
  #tripMainContainer = null;
  #tripEventsContainer = null;
  #destinationsModel = null;
  #pointDestination = null;
  #pointOffers = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #tripEventListComponent = new TripEventListView();
  #sortComponent = null;
  #currentSortType = SortTypes.DAY;
  #pointPresentors = new Map();

  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    //при изменении модели вызывается обработччик
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get point() {
    return this.#pointsModel.get();
  }

  get offers() {
    return this.#offersModel.get();
  }

  get destination() {
    return this.#destinationsModel.get();
  }

  init() {
    this.#points = sort[SortTypes.DAY]([...this.#pointsModel.get()]);
    this.#pointDestination = [...this.#destinationsModel.get()];
    this.#pointOffers = [...this.#offersModel.get()];

    render(new TripEventInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    this.#renderPointsList();
    this.#renderPoints(this.#points);
    this.#renderNoPoint();
    // this.#renderNewPoint();
  }

  #renderSort() {
    this.#sortComponent = new TripEventSortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange});

    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #renderPointsList() {
    render (this.#tripEventListComponent, this.#tripEventsContainer);
  }

  #renderPoints(points) {
    points.forEach((point) => {
      const pointPresentor = new PointPresentor({
        tripEventListComponent: this.#tripEventListComponent.element,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        onModeChange: this.#handleViewAction,
        onDataChange: this.#handleDataChange
      });
      pointPresentor.init(point);
      this.#pointPresentors.set(point.id, pointPresentor);
    });
  }

  #renderNoPoint() {
    if(this.#points.length === 0) {
      render(new TripEventNoPointView(), this.#tripEventsContainer);
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

  #clearPointList() {
    this. #pointPresentors.forEach((pointPresentontor) => pointPresentontor.destroy());
    this.#pointPresentors.clear();
    // remove(this.editform)
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
    this.#renderPoints(this.#points);
  };

  #handleDataChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresentors.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresentors.forEach((presentor) => presentor.resetView());
  };

  //заглушка
  #handleViewAction = (actonType, updateType, update) => {
    //действия пользователя, которые приводят к изменению модели
  };

  //обработчик, срабатывающий на измененени модели
  //обновленные данные берем из модели this._notify(updateType, update)
  #handleModelEvent = (updateType, data) => {

  };
}
