const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
const DATA_TIME = 'DD/MM/YY  HH:mm';
const DATA_NUMBER_MONTH = 'D MMM';
const DATA_HOUR_MINUTE = 'HH:mm';
const DAY_HOUR_MIN = 'DD[D] HH[H] mm[M]';
const HOUR_MIN = 'HH[H] mm[M]';
const MIN = 'mm[M]';
const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;
const PointType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECKIN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};
const PointTypeDescription = {
  [PointType.TAXI]: 'Taxi',
  [PointType.BUS]: 'Bus',
  [PointType.TRAIN]: 'Train',
  [PointType.SHIP]: 'Ship',
  [PointType.DRIVE]: 'Drive',
  [PointType.FLIGHT]: 'Flight',
  [PointType.CHECKIN]: 'Check-in',
  [PointType.SIGHTSEEING]: 'Sightseeing',
  [PointType.RESTAURANT]: 'Restaurant',
};
const DEFAULT_TYPE = 'flight';
const POINT_EMPTY = {
  basePrice: 0,
  dateFrom:  null,
  dateTo:  null,
  destination: null ,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE
};

const FilterTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const SortTypesDescription = {
  [SortTypes.DAY]: 'day',
  [SortTypes.EVENT]: 'event',
  [SortTypes.TIME]: 'time',
  [SortTypes.PRICE]: 'price',
  [SortTypes.OFFERS]: 'offers'
};

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const EditType = {
  EDITING: 'EDITING',
  CREATING: 'CREATING '
};

export{ PointType, PointTypeDescription, DATA_TIME, DATA_NUMBER_MONTH, DATA_HOUR_MINUTE, MSEC_IN_DAY, MSEC_IN_HOUR, DAY_HOUR_MIN, HOUR_MIN, MIN, POINT_EMPTY, FilterTypes, SortTypes,SortTypesDescription, Mode, UpdateType, UserAction, EditType };
