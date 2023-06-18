import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = [];
  #service = null;

  constructor(service) {
    super();

    this.#service = service;
    this.#points = this.#service.getPoints();
  }

  get() {
    return this.#points;
  }

  getById(id) {
    return this.#points
      .find((point) => point.id === id);
  }

  update(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  add(updateType, update) {
    this.#points = [
      update,
      ...this.#points
    ];
    this._notify(updateType, update);
  }

  delete(updateType, update) {

    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];
    this._notify(updateType, update);
  }
}
