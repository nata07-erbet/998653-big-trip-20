import TripEventView from '../view/trip-event.js';
import TripEventEditView from '../view/trip-event-edit.js';
import { replace, render, remove } from '../framework/render.js';
import { Mode } from '../constants/const.js';
import{UpdateType, UserAction} from '../constants/const.js';

export default class PointPresentor {
  #tripEventListComponent = null;
  #tripEventViewComponent = null;
  #tripEventViewEditComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  #destinationsModel = null;
  #offersModel = null;
  #onDataChange = null;
  #onModeChange = null;

  constructor({ tripEventListComponent, destinationsModel, offersModel, onDataChange, onModeChange }) {
    this.#tripEventListComponent = tripEventListComponent;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
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
      onFavoriteClick: this.#favoriteClickHandler
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
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#tripEventViewComponent, this.#tripEventViewEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Ecs') {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #favoriteClickHandler = () => {
    this.#onDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };

  #pointEditClickHandlerDown = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointEditClickHandlerUp = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #pointSumitHandler = (point) => {
    this.#onDataChange( // в обработчик передаем действия и тип обновления
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {
        ...this.#point,
        ...point
      });

    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleModeChange = () => {

  };
}
