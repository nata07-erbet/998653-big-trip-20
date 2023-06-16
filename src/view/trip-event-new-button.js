import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


function createEventNewButton(){
  return (
    /*html*/`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">TEST</button>`
  );
}

export default class TripEventNewButton extends AbstractStatefulView {
  #handleNewPointCreateButton = null;

  constructor({ onNewPointCreateButton }) {
    super();

    this.#handleNewPointCreateButton = onNewPointCreateButton;
    this.element.addEventListener('click',this.#clickHandlerCreateButton);
    this.setDisabled();
  }

  get template() {
    return createEventNewButton();
  }

  #clickHandlerCreateButton = (evt) => {
    evt.preventDefault();
    this.#handleNewPointCreateButton();
  };

  setDisabled() {
    console.log('1');
  }
}
