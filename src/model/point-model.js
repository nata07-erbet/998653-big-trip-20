import { getOffer, getPoint, getDestination } from '../mock/mocks.js';
import { POINT_COUNT } from '../constants/constants.js';

export default class PointModel {
  offers = Array.from({length: POINT_COUNT},(_, index) => getOffer(index));
  points = Array.from({length: POINT_COUNT}, (_, index) => getPoint(index));
  destinations = Array.from({length: POINT_COUNT}, (_, index) => getDestination(index));

  getOffer() {
    return this.offer;
  }

  getOffers() {
    return this.offers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }
}
