import AbstractView from '../framework/view/abstract-view.js';


function createFilterItem(filter, currentFilter) {
  const {type, hasPoints} = filter;

  return (
    /*html*/`  <div class="trip-filters__filter">
    <input
     id="filter-${type}"
     class="trip-filters__filter-input  visually-hidden" type="radio"
     name="trip-filter"
    value="${type}"
    ${type === currentFilter ? 'checked' : ''}
     ${hasPoints === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
    </div>`
  );
}

function createFiltersTemplate({fultres, currentFilter}) {
  return (
    /*html*/`<form class="trip-filters" action="#" method="get">
      ${fultres.map(createFilterItem(fultres, currentFilter))
      .join('')}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);

}

export default class TripEventFiltersView extends AbstractView{
  #fultres = null;
  #currentFilter = null;
  #onFilterChange = null;


  constructor({fultres, currentFilter, onFilterChange}) {
    super();

    this.#fultres = fultres;
    this.#currentFilter = currentFilter;
    this.#onFilterChange = onFilterChange;
  }

  get template() {
    return createFiltersTemplate({
      filtres: this.#fultres,
      currentFilter:this.#currentFilter});
  }
}


