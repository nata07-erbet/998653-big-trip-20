import TripEventFiltersView from '../view/trip-filters.js';
import { render, remove, replace } from '../framework/render.js';
import { UpdateType } from '../constants/const.js';
import { filter } from '../utils/filter.js';

export default class FilterPresentor {
  #container = null;
  #filterComponent = null;
  #pointsModel = null;
  #filterModel = null;

  #currentFilter = null;

  constructor({container, pointsModel, filterModel}) {

    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get filtres() {
    const points = this.#pointsModel.get();

    return Object.entries(filter) // [[FilterTypes.EVERYTHING], (points) => [...points]...]
      .map(([filterType, filterPoints]) => ({
        type: filterType,
        hasPoints: filterPoints(points).length > 0
      }));
  }

  init() {
    this.#currentFilter = this.#filterModel.get(); //данные пришли
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new TripEventFiltersView({
      filters: this.filtres, //фильтры рисуем  с помощью геттера
      currentFilter: this.#currentFilter,
      onFilterChange: this.#filterTypeChangeHandler
    });

    if(prevFilterComponent === null) {
      render(this.#filterComponent, this.#container);
    }
    //   render(new TripEventFiltersView(this.#fultres), this.#container);

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #modelEventHandler = () => { //не поняла сути
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    if(this.#filterModel.get() === filterType) {// ?
      return;
    }
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
