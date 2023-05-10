export default class DestinationsModel {
  constructor(service) {
    this.service = service;
    this.destinations = this.service.getDestinantions();
  }

  get() {
    return this.destinations;
  }
}
