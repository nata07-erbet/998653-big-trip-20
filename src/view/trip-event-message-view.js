import AbstractView from '../framework/view/abstract-view';
import { FilterTypes } from '../constants/const.js';

const MESSAGES_BY_TYPE_FILTER = {
  [FilterTypes.EVERYTHING]: 'Click New Event to create your first point',
  [FilterTypes.FUTURE]: 'There are no future events now',
  [FilterTypes.PAST]: 'There are no past events now',
  [FilterTypes.PRESENT]: 'There are no present events now'
};

function createMessageTemplate({filterType}) {
  const filterText = MESSAGES_BY_TYPE_FILTER[filterType];

  return `<p class="trip-events__msg">${filterText}</p>`;
}


export default class TripEvevntMessageView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();

    this.#filterType = filterType;
  }

  get template() {
    return createMessageTemplate(this.#filterType);
  }
}
