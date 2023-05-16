import { nanoid } from 'nanoid';
import { getRandomInteger, getDate } from '../utils/utils.js';
import { Price } from '../constants/const.js';


const generatePoint = (type, destinationId, offerIds) => ({
  id: nanoid(),
  basePrice: getRandomInteger(Price.MIN, Price.MAX),
  dateFrom:  getDate({next: false}),
  dateTo:  getDate({next: true}),
  destination: destinationId ,
  isFavorite: !!getRandomInteger(0, 1),
  offers: offerIds,
  type
});

export { generatePoint };

