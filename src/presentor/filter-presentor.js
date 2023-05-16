import AbstractView from '../framework/view/abstract-view.js';
import TripEventFiltersView from '../view/trip-filters.js';
import { render } from '../framework/render.js';
import {generateFilter} from '../mock/filter.js';

export default class FilterPresentor extends AbstractView {
  #container = null;
  #pointsModel = null;

  #fultres = [];

  constructor({container, pointsModel}) {
    super();

    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#fultres = generateFilter(this.#pointsModel.get());
  }

  init() {
    render(new TripEventFiltersView(this.#fultres), this.#container);
  }

}
