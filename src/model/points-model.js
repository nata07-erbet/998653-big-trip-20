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
    this.#points = this.#service.updatePoints(update); //updatePoints - что это за метод?
    this._notify(updateType, update);
  }

  add(updateType, point) {
    this.#points = this.#service.addPoint(point); //addPoin?
    this._notify(updateType, point);
  }

  delete(updateType, point) {

    this.#points = this.#service.deletePoint(point); //deletePoint ?
    this._notify(updateType, point);
  }
}
