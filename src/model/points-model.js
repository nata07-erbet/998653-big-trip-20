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

  updateTask(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can not update point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  delete(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if(index === -1) {

      throw new Error('Can not delete point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
