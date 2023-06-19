import Observable from '../framework/observable.js';

export default class OffersModel extends Observable {
  #offers = null;
  #service = null;

  constructor(service) {
    super();
    this.service = service;
  }

  async init() {
    this.#offers = this.#service.offers;
    return this.#offers;
  }

  get() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers
      .find((offer) => offer.type === type).offers;
  }
}
