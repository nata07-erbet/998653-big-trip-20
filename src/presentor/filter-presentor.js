import TripEventFiltersView from '../view/trip-filters.js';
import { render, remove, replace } from '../framework/render.js';
import { UpdateType } from '../constants/const.js';
import { filter } from '../utils/filter.js';
import {generateFilter} from '../mock/filter.js';

export default class FilterPresentor {
  #container = null;
  #pointsModel = null;

  #fultres = [];

  constructor({container, pointsModel}) {


    this.#container = container;
    this.#pointsModel = pointsModel;

    this.#fultres = generateFilter(this.#pointsModel.get());
  }

  init() {
    render(new TripEventFiltersView(this.#fultres), this.#container);
  }

}
