import TripEventEditView from '../view/trip-event-edit.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { Mode } from '../constants/const.js';
import { UserAction, UpdateType } from '../constants/const.js';
import { EditType } from '../constants/const.js';


export default class NewPointPresentor {
  #container = null;
  #newPointComponent = null;
  #destinationsModel = null;
  #tripEventViewEditComponent = null;
  #offersModel = null;
  #mode = null;

  #handleDataChange = null;
  #handleDestroy = null;

  constructor({container, destinationsModel, offersModel, onDataChange, onClose}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onClose;
  }

  init() {
    if(this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new TripEventEditView({
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onFormSubmit: this.#formSubmitHandler,
      onResetClick: this.#resetClickHandler,
      type: EditType.CREATING,
    });

    render(this.#newPointComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = (isCanceled = true) => {
    if(this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy(isCanceled);

    remove(this.#newPointComponent);
    this.#newPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #formSubmitHandler = (point) => {
    this.#handleDataChange(
      UserAction.CREATING,
      UpdateType.MINOR,
      point,
    );
    this.destroy(false);
  };

  #resetClickHandler = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Ecs') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#tripEventViewEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#tripEventViewEditComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#tripEventViewEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#tripEventViewEditComponent.shake(resetFormState);
  }

}
