import TripEventView from '../view/trip-event.js';
import TripEventEditView from '../view/trip-event-edit.js';
import {replace, render} from '../framework/render.js';

export default class PointPresentor {
  #tripEventListComponent = null;
  #tripEventViewComponent = null;
  #tripEventViewEditComponent = null;

  #points = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  constructor({tripEventListComponent, pointsModel, destinationsModel, offersModel}) {
    this.#tripEventListComponent = tripEventListComponent;
    this.#pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;

  }

  init(points) {
    this.#renderPoints(points);
  }

  #renderPoint(point, pointDestination, pointOffers) {

    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;

    this.#tripEventViewComponent = new TripEventView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onClickDown: this.#pointEditClickHandlerDown
    });

    this.#tripEventViewEditComponent = new TripEventEditView({
      point: this.#points[0],
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onClickUp: this.#pointEditClickHandlerUp,
      onFormSubmit: this.#pointSumitHandler
    });

    render(
      this.#tripEventViewComponent,
      this.#tripEventListComponent.element);
  }

  #renderPoints(points) {
    this.#points = points;
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #replacePointToForm() {
    replace(this.#tripEventViewEditComponent, this.#tripEventViewComponent);
  }

  #replaceFormToPoint() {
    replace(this.#tripEventViewComponent, this.#tripEventViewEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape' || evt.key === 'Ecs') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #pointEditClickHandlerDown() {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #pointEditClickHandlerUp() {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #pointSumitHandler() {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown',this.#escKeyDownHandler);
  }
}
