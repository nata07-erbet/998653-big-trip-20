import {getRandomArrayElement} from '../utils.js';
import {PointType, CITY_NAME, CITY_DESCRIPTION, PICTURE_DESCRIPTION, OFFER_TITLE , POINT_COUNT, OFFER_DESCRIPTION_COUNT} from '../mock/constants.js';
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

const getOffers = () => Array.from({length: POINT_COUNT},(_, index) => getOffer(index));
const offersByType = getOffers();


const getPoint = () => {
  const type = getRandomType();
  const pointTypeOffers = offersByType.find((offer) => offer.type === type).offers;

  return ({
    id: nanoid(),
    basePrice: 1100,
    dateFrom: dayjs(),
    dateTo: dayjs().hour(17),
    destination: nanoid(),
    isFavorite: false,
    offers: pointTypeOffers,
    type: getRandomType()
  });
};

const getPoints = () =>Array.from({length: POINT_COUNT}, (_, index) => getPoint(index));


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

// eslint-disable-next-line no-console
console.log(offersByType);
