import Observable from '../framework/observable.js';

export default class DestinationsModel extends Observable {

  #destinations = null;
  #service = null;

  constructor(service) {
    super();
    this.#service = service;
  }

  async init() {
    try{
      this.#destinations = await this.#service.destinations;
    } catch{
      this.#destinations = [];
    }
  }

  get() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations
      .find((destination) => destination.id === id);
  }
}
