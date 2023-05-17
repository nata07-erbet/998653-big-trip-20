import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventSortView from '../view/trip-sort.js';
import {render, RenderPosition} from '../framework/render.js';
import TripEventNoPointView from '../view/trip-no-point.js';
import TripEventAddView from '../view/trip-event-add.js';
import PointPresentor from './points-presentor.js';

export default class BoardPresentor {
  #tripMainContainer = null;
  #tripEventsContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #tripEventListComponent = new TripEventListView();

  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.get()];
    this.pointDestination = [...this.#destinationsModel.get()];
    this.pointOffers = [...this.#offersModel.get()];

    render(new TripEventInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    this.#renderNewPoint();

    render (new TripEventListView(), this.#tripEventsContainer);

    this.#renderPoints(this.#points);
    this.#renderNoPoint();
  }

  #renderSort() {
    render(new TripEventSortView(), this.#tripEventsContainer);
  }

  #renderPoints(points) {
    const pointPresentor = new PointPresentor({
      tripEventListComponent: this.#tripEventListComponent.element
    });
    pointPresentor.init(points);
  }

  #renderNewPoint() {
    const tripEventAddComponent = new TripEventAddView({
      point: this.#points[0],
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get()
    });
    render (tripEventAddComponent, this.#tripEventsContainer);
  }

  #renderNoPoint() {
    if(this.#points.length === 0) {
      render(new TripEventNoPointView(), this.#tripEventsContainer);
    }
  }

}
