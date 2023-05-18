import TripEventView from '../view/trip-event.js';
import TripEventEditView from '../view/trip-event-edit.js';
import { replace, render, remove } from '../framework/render.js';

export default class PointPresentor {
  #tripEventListComponent = null;
  #tripEventViewComponent = null;
  #tripEventViewEditComponent = null;

  #point = null;

  #destinationsModel = null;
  #offersModel = null;

  constructor({ tripEventListComponent, destinationsModel, offersModel }) {
    this.#tripEventListComponent = tripEventListComponent;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(point) {
    const prevPointComponent = this.#tripEventViewComponent;
    const prevPointEditComponent = this.#tripEventViewEditComponent;

    if(prevPointComponent === null || prevPointEditComponent === null) {
      this.#renderPoint(point);
      return;
    }

    if(this.#tripEventListComponent.contains(prevPointComponent.element)) {
      replace(this.#tripEventViewComponent, prevPointComponent);
    }

    if(this.#tripEventListComponent.contains(prevPointEditComponent.element)) {
      replace(this.#tripEventViewEditComponent, prevPointEditComponent);
    }
  }

  destroy() {
    remove(this.#tripEventViewComponent);
    remove(this.#tripEventViewEditComponent);
  }

  #renderPoint(point) {
    this.#point = point;

    this.#tripEventViewComponent = new TripEventView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onClickDown: this.#pointEditClickHandlerDown,
      onClickFavorite: this.#pointAddClickHandlerFavorite
    });

    this.#tripEventViewEditComponent = new TripEventEditView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onClickUp: this.#pointEditClickHandlerUp,
      onFormSubmit: this.#pointSumitHandler
    });

    render(this.#tripEventViewComponent, this.#tripEventListComponent);
  }

  #replacePointToForm = () => {
    replace(this.#tripEventViewEditComponent, this.#tripEventViewComponent);
  };

  #replaceFormToPoint = () => {
    replace(this.#tripEventViewComponent, this.#tripEventViewEditComponent);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Ecs') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #pointEditClickHandlerDown = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointEditClickHandlerUp = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointSumitHandler = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointAddClickHandlerFavorite = () => {
    this.#replaceFormToPoint(); // как пример
  }
}
