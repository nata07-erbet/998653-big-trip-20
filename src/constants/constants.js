const POINT_COUNT = 15;
const PICTURE_COUNT = 6;
const OFFER_COUNT = 15;
const OFFER_DESCRIPTION_COUNT = 5;

const PRICE = {
  MIN: 100,
  MAX: 2000
};

const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

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
  [PointType.BUS]: 'bus',
  [PointType.TRAIN]: 'train',
  [PointType.SHIP]: 'ship',
  [PointType.DRIVE]: 'drive',
  [PointType.FLIGHT]: 'flight',
  [PointType.CHECKIN]: 'check-in',
  [PointType.SIGHTSEEING]: 'sightseeing',
  [PointType.RESTAURANT]: 'restaurant',
};
const CITY_NAME = ['Chamonix', 'Geneva', 'Amsterdam', 'Helsinki', 'Oslo', 'Kopenhagen', 'Den Haag', 'Rotterdam', 'Saint Petersburg', 'Moscow', 'Sochi', 'Tokio', 'Kioto', 'Nagasaki', 'Hiroshima', 'Berlin', 'Munich', 'Frankfurt', 'Vien', 'Rome', 'Naples', 'Venice', 'Milan', 'Monaco', 'Paris', 'Barcelona', 'Valencia', 'Madrid'];

const CITY_DESCRIPTION = [
  'a true asian pearl, with crowded streets, with a beautiful old town',
  'with a beautiful old town, middle-eastern paradise',
  'with a beautiful old town, middle-eastern paradise',
  'a true asian pearl, in a middle of Europe, with a beautiful old town',
  'with an embankment of a mighty river as a centre of attraction, full of of cozy canteens where you can try the best coffee in the Middle East',
  'with crowded streets, in a middle of Europe, famous for its crowded street markets with the best street food in Asia',
  'a true asian pearl, in a middle of Europe, middle-eastern paradise, a perfect place to stay with a family, famous for its crowded street markets with the best street food in Asia.',
  'pictures',
  'ith a beautiful old town',
  'is a beautiful city, for those who value comfort and coziness, full of of cozy canteens where you can try the best coffee in the Middle East.',
  'pictures'
];

const PICTURE_DESCRIPTION = [
  'Chamonix biggest supermarket',
  'Geneva kindergarten',
  'Amsterdam central station',
  'Helsinki kindergarten',
  'Oslo city centre',
  'Kopenhagen parliament building',
  'Den Haag city centre',
  'Rotterdam kindergarten',
  'Saint Petersburg parliament building'
];

const OFFER_TITLE = [
  'Choose VIP area',
  'With air conditioning',
  'With automatic transmission',
  'Business lounge',
  'Add luggage',
  'Upgrade to business class',
  'Choose seats',
  'Choose meal',
  'Order a meal from the restaurant',
  'Add breakfast',
  'Choose the time of check-out',
  'Wake up at a certain time'
];

const DATE_GAP = 3;

const DATA_TIME = 'DD/MM/YY  HH:mm';

const DATA_NUMBER_MONTH = 'D MMM';
const DATA_HOUR_MINUTE = 'HH:mm';

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


export{PointType,PointTypeDescription, CITY_NAME, CITY_DESCRIPTION, PICTURE_DESCRIPTION, OFFER_COUNT,OFFER_TITLE, POINT_COUNT, OFFER_DESCRIPTION_COUNT, DATA_TIME, DATA_NUMBER_MONTH, DATA_HOUR_MINUTE, DATE_GAP, PRICE, PICTURE_COUNT, MSEC_IN_DAY, MSEC_IN_HOUR, DAY_HOUR_MIN, HOUR_MIN, MIN, POINT_EMPTY};
