import TripEventFiltersView from '../view/trip-filters.js';
import { render } from '../framework/render.js';

export default class FilterPresentor {
  #container = null;
  #pointsModel = null;
  #filteres = [];

  constructor({container, pointsModel}) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    render(new TripEventFiltersView(this.#filteres), this.#container);
  }
}
