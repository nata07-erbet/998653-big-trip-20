import AbstractView from '../framework/view/abstract-view.js';
function createEventNewTemplate () {
  return (/*html*/ `
    <section class="trip-events">
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">Click New Event to create your first point</p>
    </section>`);
}

export default class TripEventNew extends AbstractView{
  #point = null;
  #pointDestination = null;
  #pointOffers = null;

  constructor ({point, pointDestination, pointOffers}) {
    super();

    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffers = pointOffers;
  }

  get template() {
    return createEventNewTemplate (this.#point, this.#pointDestination, this.#pointOffers);
  }
}
