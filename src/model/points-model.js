export default class PointsModel {
  #points = null;

  constructor(service) {
    this.service = service;
    this.#points = this.service.getPoints();
  }

  get() {
    return this.#points;
  }
}
