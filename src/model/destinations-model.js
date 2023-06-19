import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {

  #destinations = null;
  #service = null;

  constructor(service) {
    super();
    this.service = service;
  }

  async init() {
    this.#destinations = await this.#service.destinations;
    return this.#destinations;
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations
      .find((destination) => destination.id === id);
  }
}
