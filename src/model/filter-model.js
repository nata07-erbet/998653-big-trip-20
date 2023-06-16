import Observable from '../framework/observable.js';
import { FilterTypes } from '../constants/const.js';

export default class FilterModel extends Observable {
  #filter = FilterTypes.EVERYTHING;

  get() {
    return this.#filter;
  }

  setFilter(filter) {
    this.#filter = filter;

    this._notify(filter);
  }
}
