import {filter} from '../utils/filter_type.js';

function generateFilter (points) {
  return Object.entries(filter)
    .map(([filterType, filterPoints]) => ({
      type: filterType,
      hasPoints: filterPoints(points).length > 0
    }));
}

export {generateFilter};
