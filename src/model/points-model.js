import Observable from '../framework/observable.js';
import { UpdateType } from '../constants/const.js';
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
    try{
      const points = await this.#service.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  }

  get() {
    return this.#points;
  }

  getById(id) {
    return this.#points
      .find((point) => point.id === id);
  }

   async update(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#service.updatePoint(update);
      const updatePoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatePoint,
        ...this.#points.slice(index + 1)
      ];

      this._notify(updateType, updatePoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }








  }


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

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
      basePrice: point['base_price'],
    };

    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    delete adaptedPoint['base_price'];

    return adaptedPoint;
  }
}
