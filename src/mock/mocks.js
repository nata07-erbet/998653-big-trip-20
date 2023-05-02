import {getRandomArrayElement} from '../utils.js';
import {PointType, CITY_NAME, CITY_DESCRIPTION, PICTURE_DESCRIPTION, OFFER_TITLE , POINT_COUNT} from '../mock/constants.js';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
//объект переведем в массив

const getRandomType = () => getRandomArrayElement(Array.from(Object.values(PointType)));
const type = getRandomType();

const getPoint = () => ({
  id: nanoid(),
  basePrice: 1100,
  dateFrom: dayjs(),
  dateTo: dayjs().hour(17),
  destination: nanoid(),
  isFavorite: false,
  offers: nanoid(),
  type: type
});

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

const getOffer = () => ({
  type: type,
  offers: [
    {
      id: nanoid(),
      title: getRandomArrayElement(OFFER_TITLE),
      price: 120
    }
  ]
});

// eslint-disable-next-line no-console
console.log(getPoints(), getDestination(),getOffer());
