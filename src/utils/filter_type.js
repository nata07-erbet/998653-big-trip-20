import {FilterTypes} from '../constants/const.js';
import {isPointFuture, isPointPresent, isPointPast} from '../utils/point_type.js';

const filter = {
  [FilterTypes.EVERYTHING]: (points) => [...points],
  [FilterTypes.FUTURE]: (points) => points.filter((point) => isPointFuture(point)),
  [FilterTypes.PRESENT]: (points) => points.filter((point) => isPointPresent(point)),
  [FilterTypes.PAST]: (points) => points.filter((point) => isPointPast(point))
};

export {filter};
