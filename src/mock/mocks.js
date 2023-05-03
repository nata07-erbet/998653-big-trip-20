import {getRandomArrayElement, getRandomInt } from '../utils.js';
import {PointType, CITY_NAME, CITY_DESCRIPTION, PICTURE_DESCRIPTION, OFFER_TITLE , OFFER_DESCRIPTION_COUNT, PRICE } from '../constants/constants.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
//объект переведем в массив

const getRandomType = () => getRandomArrayElement(Array.from(Object.values(PointType)));

const getOfferDescription = () => ({
  id: nanoid(),
  title: getRandomArrayElement(OFFER_TITLE),
  price: 1200
});

const getOfferDescriptionArr = () => Array.from({length: OFFER_DESCRIPTION_COUNT}, (_, index) => getOfferDescription(index));

const getOffer = () => ({
  type: getRandomType(),
  offers: getOfferDescriptionArr()
});

const getPoint = () =>
  // const avalibleOffers = offersByType.find((offer) => offer.type === point.type) //все доступные офферы
  // const selectedOffers = 7;
  ({
    id: nanoid(),
    basePrice: getRandomInt(PRICE.MIN, PRICE.MAX),
    dateFrom: dayjs(),
    dateTo: dayjs().hour(17),
    destination: nanoid(),
    isFavorite: false,
    offers: [1],
    type: getRandomType()
  });
const getDestination = () => ({
  id: nanoid(),
  description: getRandomArrayElement(CITY_DESCRIPTION),
  name: getRandomArrayElement(CITY_NAME),
  pictures: [
    {
      src: `https://loremflickr.com/248/152?r=${Math.random()}`,
      description: getRandomArrayElement(PICTURE_DESCRIPTION)
    }
  ]
});

export { getOffer, getPoint, getDestination, getOfferDescriptionArr };
