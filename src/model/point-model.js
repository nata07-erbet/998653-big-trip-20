import { getOffer, getPoint, getDestination } from '../mock/mocks.js';
import { POINT_COUNT,OFFER_DESCRIPTION_COUNT } from '../constants/constants.js';

export default class PointModel {
  allOffers = Array.from({length: OFFER_DESCRIPTION_COUNT},(_, index) => getOffer(index));
  points = Array.from({length: POINT_COUNT}, (_, index) => getPoint(index));
  destinations = Array.from({length: POINT_COUNT}, (_, index) => getDestination(index));

  getOffers() {
    return this.allOffers;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }
}
