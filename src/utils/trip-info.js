import dayjs from 'dayjs';
import { DESTINATION_ITEMS_LENGTH, SortTypes } from '../constants/const';
import { sort } from './sort.js';

function getTripTitle(points = [], destinations = []) {
  const destionationNames = sort[SortTypes.DAY]([...points])
    .map((point) => destinations.find((destination) =>destination.id === point.destination).name);

  return destionationNames.length <= DESTINATION_ITEMS_LENGTH
    ? destionationNames.join('&nbsp;&mdash;&nbsp;')
    : `${destionationNames.at(0)}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destionationNames.at(-1)}`;
}

function getTripDuration(points = []) {
  const sortedPoints = sort[SortTypes.DAY]([...points]);
  return (sortedPoints.length > 0)
    ? `${dayjs(sortedPoints.at(0).dateFrom).format('DD MMM')}&nbsp;&mdash;&nbsp;${dayjs(sortedPoints.at(-1).dateTo.format('DD MMM'))}`
    : '';
}

function getOffersCost(offersIds = [], offers = []) {
  return offersIds.reduce(
    (result, id) => result + (offers.find((offer) => offer.id === id)?.price ?? 0),
    0
  );
}

function getTripCost(points = [], offers = []) {
  return points.reduce(
    (result, point) => result + point.basePrice + getOffersCost(point.offers, offers.find((offer) => point.type === offer))
  );
}

export {
  getTripTitle,
  getTripCost,
  getTripDuration,
};
