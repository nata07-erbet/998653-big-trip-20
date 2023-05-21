import TripEventView from '../view/trip-event.js';
import TripEventEditView from '../view/trip-event-edit.js';
import { replace, render, remove } from '../framework/render.js';
import { Mode } from '../constants/const.js';

export default class PointPresentor {
  #tripEventListComponent = null;
  #tripEventViewComponent = null;
  #tripEventViewEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULTn;

  #destinationsModel = null;
  #offersModel = null;

  #handleModeChange = null;

  constructor({ tripEventListComponent, destinationsModel, offersModel, onModeChange }) {
    this.#tripEventListComponent = tripEventListComponent;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleModeChange = onModeChange
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#tripEventViewComponent;
    const prevPointEditComponent = this.#tripEventViewEditComponent;

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

    if(prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#tripEventViewComponent, this.#tripEventListComponent);
      return;
    }

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#tripEventViewComponent, prevPointComponent);
    }

    if(this.#mode === Mode.EDITING) {
      replace(this.#tripEventViewEditComponent, prevPointEditComponent);
    }
    remove(prevPointComponent);
    remove (prevPointEditComponent);
  }

  resetView = () => {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  destroy() {
    remove(this.#tripEventViewComponent);
    remove(this.#tripEventViewEditComponent);
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
  };
}
