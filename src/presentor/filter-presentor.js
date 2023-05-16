import AbstractView from '../framework/view/abstract-view.js';
import TripEventFiltersView from '../view/trip-filters.js';
import { render } from '../framework/render.js';
// import {generateFiltres}  from '../mock';

export default class FilterPresentor extends AbstractView {
  #container = null;
  #pointsModel = null;

  #fultres = [];

  constructor({container, pointsModel}) {
    super();

    this.#container = container;
    this.#pointsModel = pointsModel;

    // this.#fultres = generateFiltres(this.#pointsModel.get());
  }

  init() {
    render(new TripEventFiltersView(), this.#container);
  }

}
