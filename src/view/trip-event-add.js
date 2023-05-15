import AbstractView from '../framework/view/abstract-view.js';
import {TYPES} from '../constants/const.js';

function createEventTypeTemplate(type) {
  return (
  /*html*/`<label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type} icon">
      </label>`);
}

function createEventTypeList() {
  return(
    TYPES
      .map((type) => /*html*/` <div class="event__type-item">
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type[0].toUpperCase() + type.slice(1)}</label>
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        `).join(''));
}

function createEventType(type) {
  return (
    /*html*/`<label class="event__label  event__type-output" for="event-destination-1">
      ${type}
     </label>`
  );
}

function createEventTypeName(name) {
  return (
    /*html*/`<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">`);
}
function createEventAddTemplate (point, pointDestinations) {
  const {destination, type} = point;
  const pointDestination = pointDestinations.find((itemDestination) => (itemDestination.id === destination));
  const {description, name, pictures} = pointDestination;


  return (
    /*html*/`<form class="event event--edit" action="#" method="post">
    <header class="event__header">
    <div class="event__type-wrapper">
      ${createEventTypeTemplate(type)}
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
          ${createEventTypeList(TYPES)}
        </div>
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    ${createEventType(type)}
    ${createEventTypeName(name)}
    <datalist id="destination-list-1">
    <option value="Amsterdam"></option>
    <option value="Geneva"></option>
    <option value="Chamonix"></option>
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
    —
    <label class="visually-hidden" for="event-end-time-1">To</label>
   <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/ 19 00:00">
</div>

<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    €
  </label>
  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
</div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Cancel</button>
  </header>
  <section class="event__details">

  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">

    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked="">
      <label class="event__offer-label" for="event-offer-luggage-1">
        <span class="event__offer-title">Add luggage</span>
        +€&nbsp;
        <span class="event__offer-price">30</span>
      </label>
    </div>

  </div>
</section>

<section class="event__section  event__section--destination">
  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
  <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>

  <div class="event__photos-container">
    <div class="event__photos-tape">
      <img class="event__photo" src="img/photos/1.jpg" alt="Event photo">
      <img class="event__photo" src="img/photos/2.jpg" alt="Event photo">
      <img class="event__photo" src="img/photos/3.jpg" alt="Event photo">
      <img class="event__photo" src="img/photos/4.jpg" alt="Event photo">
      <img class="event__photo" src="img/photos/5.jpg" alt="Event photo">
    </div>
  </div>
</section>
</section>
</form>`);
}

export default class TripEventAddView extends AbstractView {
  #point = null;
  #pointDestinations = null;
  #pointOffers = null;


  constructor ({point, pointDestinations, pointOffers}) {
    super();

    this.#point = point;
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
  }

  get template() {
    return createEventAddTemplate(this.#point, this.#pointDestinations, this.#pointOffers);
  }
}


