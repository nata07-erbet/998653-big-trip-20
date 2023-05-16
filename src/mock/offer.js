import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/utils.js';
import{ Price } from '../constants/const.js';


const generateOffer = (type) => (
  {
    id: nanoid(),
    title: `Offer ${type}`,
    price: getRandomInteger(Price.MIN, (Price.MAX / 10))
  });

export { generateOffer };
