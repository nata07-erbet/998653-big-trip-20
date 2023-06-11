import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = null;

  constructor(service) {
    super();

    this.service = service;
    this.#points = this.service.getPoints();
  }

  get() {
    return this.#points;
  }
}
