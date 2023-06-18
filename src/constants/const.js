const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const CITIES = [
  'Chamonix',
  'Geneva',
  'Amsterdam',
  'Helsinki',
  'Oslo',
  'Kopenhagen',
  'Den Haag',
  'Rotterdam',
  'Moscow'
];

const DESCRIPTION = [
  'A true asian pearl, with crowded streets, with a beautiful old town',
  'With a beautiful old town, middle-eastern paradise',
  'Its a beautiful old town'
];
const DESTINATION_COUNT = 4;
const OFFER_COUNT = 6;
const POINT_COUNT = 15;

const Price = {
  MIN: 1,
  MAX: 2
};

const Duration = {
  HOUR: 5,
  DAY: 5,
  MIN: 59
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

export {TYPES, CITIES, DESCRIPTION, Price, Duration, DESTINATION_COUNT, OFFER_COUNT, POINT_COUNT, FilterTypes, SortTypes,SortTypesDescription, Mode, UpdateType, UserAction, EditType};
