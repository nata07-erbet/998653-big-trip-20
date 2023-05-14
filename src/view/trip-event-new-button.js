import AbstractView from '../framework/view/abstract-view.js';

function createEventNewButton(){
  return (
    /*html*/`<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
  );
}

export default class TripEventNewButton extends AbstractView {
  #handleNewPointCreateButton = null;

  constructor({onNewPointCreateButton}) {
    super();

    this.#handleNewPointCreateButton = onNewPointCreateButton;
    this.element.querySelector('.trip-main__event-add-btn').addEventListener('click',this.#clickHandlerCreateButton);
  }

  get template() {
    return createEventNewButton();
  }

  #clickHandlerCreateButton = (evt) => {
    evt.preventDefault();
    this.#handleNewPointCreateButton();
  };
}
