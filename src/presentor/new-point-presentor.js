import TripEventEditView from '../view/trip-event-edit.js';
import { remove, render, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../constants/const.js';
import { EditType } from '../constants/const.js';


export default class NewPointPresentor {
  #container = null;
  #newPointComponent = null;
  #destinationsModel = null;
  #offersModel = null;

  #onClose = null;
  #onDataChange = null;

  constructor({container, destinationsModel, offersModel, onClose, onDataChange}) { //какие обработчики перездаем в презентор
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onClose = onClose;
    this.#onDataChange = onDataChange;
  }

  init() {
    if(this.#newPointComponent !== null) {
      return;
    }

    this.#newPointComponent = new TripEventEditView({
      pointDestination: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onFormSubmit: this.#formSubmitHandler,
      onResetClick: this.#resetClickHandler,
      type: EditType.CREATING,
    });

    render(this.#newPointComponent, this.#container);
  }

  #formSubmitHandler = () => {

  };

  #resetClickHandler = () => {

  };

}
