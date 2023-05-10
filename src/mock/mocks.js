import {getRandomArrayElement, getRandomInt } from '../utils.js';
import {PointType, CITY_NAME, CITY_DESCRIPTION, PICTURE_DESCRIPTION, OFFER_TITLE, OFFER_COUNT, OFFER_DESCRIPTION_COUNT, PRICE, PICTURE_COUNT, DATE_GAP } from '../constants/constants.js';
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

const getOffersArr = () => Array.from({length: OFFER_COUNT},(_,index) => getOffer(index));

const getPictureDestination = () => (
  {
    src: `https://loremflickr.com/248/152?r=${Math.random()}`,
    description: getRandomArrayElement(PICTURE_DESCRIPTION)
  }
);

const getPictursDestinationArr = () => Array.from({length: PICTURE_COUNT}, (_,index) => getPictureDestination(index));


const getDestination = () => ({
  id: nanoid(),
  description: getRandomArrayElement(CITY_DESCRIPTION),
  name: getRandomArrayElement(CITY_NAME),
  pictures: getPictursDestinationArr()
});


const getPoint = () =>
  // const avalibleOffers = offersByType.find((offer) => offer.type === point.type) //все доступные офферы
  // const selectedOffers = 7;
  ({
    id: nanoid(),
    basePrice: getRandomInt(PRICE.MIN, PRICE.MAX),
    dateFrom: dayjs(),
    dateTo: dayjs().hour(DATE_GAP),
    destination: getDestination(),
    isFavorite: false,
    offers: getOffersArr(),
    type: getRandomType()
  });


export { getOffer, getPoint, getDestination, getOfferDescriptionArr, getOffersArr };
