import {FilterTypes} from '../constants/const.js';

const filter = {
  [FilterTypes.EVERYTHING]: () => {},
  [FilterTypes.FUTURE]: () => {},
  [FilterTypes.PRESENT]: () => {},
  [FilterTypes.PAST]: () => {}
};

export {filter};
