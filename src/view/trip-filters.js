import AbstractView from '../framework/view/abstract-view.js';


function createFilterItem(filter) {
  const {type, hasPoints} = filter;

  return (
    /*html*/`  <div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${hasPoints === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFiltersTemplate(fultres) {
  return (
    /*html*/`<form class="trip-filters" action="#" method="get">
      ${fultres.map(createFilterItem).join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);

}

export default class TripEventFiltersView extends AbstractView{
  #fultres = null;

  constructor(fultres) {
    super();

    this.#fultres = fultres;
  }

  get template() {
    return createFiltersTemplate(this.#fultres);
  }
}


