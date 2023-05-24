import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventSortView from '../view/trip-sort.js';
import {render, RenderPosition} from '../framework/render.js';
import TripEventNoPointView from '../view/trip-no-point.js';
// import TripEventAddView from '../view/trip-event-add.js';
import PointPresentor from './points-presentor.js';
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

  #pointPresentors = new Map();
  #currentSortType = SortTypes.DAY;

  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = sort[SortTypes.DAY]([...this.#pointsModel.get()]);
    this.#pointDestination = [...this.#destinationsModel.get()];
    this.#pointOffers = [...this.#offersModel.get()];

    render(new TripEventInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    // this.#renderNewPoint();

    render (this.#tripEventListComponent, this.#tripEventsContainer);

    this.#renderPoints(this.#points);
    this.#renderNoPoint();
  }

  #renderPoints(points) {
    points.forEach((point) => {
      const pointPresentor = new PointPresentor({
        tripEventListComponent: this.#tripEventListComponent.element,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        onModeChange: this.#handleModeChange,
        onDataChange: this.#handleDataChange
      });
      pointPresentor.init(point);
      this.#pointPresentors.set(point.id, pointPresentor);
    });
  }

  #sortPoints = (sortType) => {
    this.#currentSortType = sortType;
    this.#points = sort[this.#currentSortType](this.#points);
  };

  #clearPointList() {
    this. #pointPresentors.forEach((pointPresentontor) => pointPresentontor.destroy());
    this.#pointPresentors.clear();
    // remove(this.editform)
  }

  #renderSort() {
    this.#sortComponent = new TripEventSortView({
      sortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortChange
    });
    render(this.#sortComponent, this.#tripEventsContainer);
  }


  // #renderNewPoint() {
  //   const tripEventAddComponent = new TripEventAddView({
  //     point: this.#points[0],
  //     pointDestinations: this.#destinationsModel.get(),
  //     pointOffers: this.#offersModel.get()
  //   });
  //   render (tripEventAddComponent, this.#tripEventsContainer);
  // }

  #renderNoPoint() {
    if(this.#points.length === 0) {
      render(new TripEventNoPointView(), this.#tripEventsContainer);
    }
  }

  #handleSortChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #handleDataChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresentors.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresentors.forEach((presentor) => presentor.resetView());
  };
}
