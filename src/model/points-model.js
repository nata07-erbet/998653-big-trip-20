import Observable from '../framework/observable.js';
// import { UpdateType } from '../constants/const.js';
// import { adaptToClient, adaptToServer } from '../utils/point.js';
// import { updateItem } from '../utils/utils.js';

export default class PointsModel extends Observable {
  #points = [];
  #service = null;
  #destinationsModel = null;
  #offersModel = null;


  constructor(service, destinationsModel, offersModel) {
    super();

    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

  }

  async init() {
    this.#points = this.#service.points;
    return this.#points;
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
