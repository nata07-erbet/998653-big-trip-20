import AbstractView from '../framework/view/abstract-view.js';
import {SortTypes, SortTypesDescription} from '../constants/const.js';

function createEventSortItem(sortType) {
  return(
    /*html*/`<div class="trip-sort__item  trip-sort__item--day">
    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked="" data-sort-type ="${SortTypesDescription[sortType]}">
    <label class="trip-sort__btn" for="sort-day">${sortType}</label>
  </div>`
  );
}

function createEventSortTemplate() {
  return (
    /*html*/ `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SortTypes)
      .map((sortType) => createEventSortItem(sortType))
      .join('')}
    </form>`);
}

export default class TripEventSortView extends AbstractView{
  #handleonSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();

    this.#handleonSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createEventSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if(evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleonSortTypeChange(evt.target.dataset.SortType);
  };
}


