import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDueDateTime } from '../utils/utils.js';
import { PointType,PointTypeDescription } from '../constants/constants.js';
import { POINT_EMPTY } from '../constants/constants.js';

function createEventType() {
  return(
    Object.values(PointType).map((pointType) => /*html*/`<div class="event__type-item">
    <input id="event-${pointType}-taxi-1" class="event__${pointType}-input  visually-hidden" type="radio" name="event-type" value=${pointType}>
    <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${PointTypeDescription[pointType]}</label>
      </div>`).join('')
  );
}

function createOffersByPointType (point, pointOffers) {
  return (
    pointOffers.find((pointOffer) => pointOffer.type === pointOffer.type)
      .offers
      .map((offer) => /*html*/`<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${(point.offers.includes(offer.id) ? 'checked' : '')}>
          <label class="event__offer-label" for="event-offer-luggage-1">
           <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`)
      .join('')
  );
}

function createDestinationsCites(destinations) {
  return(
    destinations
      .map((dest) => `<option value=${dest.id}>${dest.name}</option>`)
      .join()
  );
}

function createPicturiesOfDestination (pictures) {
  return (
    pictures.map((image) => /*html*/ `<img class="event__photo" src="${image.src}" alt="Event photo">`));
}

function createEventEditTemplate({state, pointDestinations, pointOffers}) {
  const {point} = state;

  const { basePrice, dateFrom, dateTo, destination, type } = point;
  const pointDestination = pointDestinations.find((x) => x.id === destination);
  const {description, name, pictures} = pointDestination;

  return (/*html*/`<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__${type}-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event ${type}icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventType(PointType,PointTypeDescription)};
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
        <datalist id="destination-list-1">
        ${createDestinationsCites(pointDestinations)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointDueDateTime(dateFrom)}">
        —
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointDueDateTime(dateTo)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          €
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=
          ${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>

    <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">

      ${createOffersByPointType(point, pointOffers)}

      </div>
    </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>
    <div class="event__photos-container">
    <div class="event__photos-tape">

    ${createPicturiesOfDestination(pictures)}

    </div>
  </div>
  </section>
</section>

</form>`);
}

export default class TripEventEditView extends AbstractStatefulView {
  #point = null;
  #pointDestinations = null;
  #pointOffers = null;
  #handleClickUp = null;
  #handleFormSubmit = null;

  constructor ({ point = POINT_EMPTY, pointDestinations, pointOffers, onClickUp, onFormSubmit}) {
    super();

    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;

    this._setState(TripEventEditView.parsePointToState({point})); //?

    this.#handleClickUp = onClickUp;
    this.#handleFormSubmit = onFormSubmit;

    this._restoreHandlers();

  }

  get template() {
    return createEventEditTemplate ({
      state: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers
    });
  }

  reset = (point) => this.updateElement({point}); //?

  _restoreHandlers = () => {
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickHandlerUp);

    this.element
      .addEventListener('submit', this.#formSumbitHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeInputhandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationInputChangeHandler);

    const offerBlock = this.element
      .querySelector('.event__available-offers');

    if(offerBlock) {
      offerBlock.addEventListener('change', this.#offerClickHandler);
    }
  };

  #clickHandlerUp = (evt) => {
    evt.preventDefault();
    this.#handleClickUp();
  };

  #formSumbitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #typeInputhandler = (evt) => { //?
    evt.preventDefault();
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: []
      }
    });
  };

  #destinationInputChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this.#pointDestinations
      .find((pointDestination) => pointDestination.name);

    const selectedDestinationId = selectedDestination.id;

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestinationId
      }
    });

  };

  #offerClickHandler = (evt) => {
    evt.preventDefault();

    const checkboxBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point: {
        ...this._state.point,
        offers: checkboxBoxes.map((element) => element.dataset.offerID)
      }
    });
  };

  #priceInputChange = (evt) => {
    evt.preventDefault();

    this._setState({
      point:{
        ...this.state.point,
        basePrice: evt.target.valueAsNumber

      }
    });
  };

  static parsePointToState = ({point}) => ({point}); //?
  static parseStatetoPoint = (state) => state.point; //?

}
