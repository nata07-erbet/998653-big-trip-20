import FilterPresentor from './presentor/filter-presentor.js';
import BoardPresentor from './presentor/board-presentor.js';
import MockService from './servise/mock-service.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import PointsModel from './model/points-model.js';


const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const tripFilterContainer = document.querySelector('.trip-controls__filters');


const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const filterpresentor = new FilterPresentor({
  container: tripFilterContainer,
  pointsModel
});

const boardPresentor = new BoardPresentor({
  tripMainContainer,
  tripEventsContainer,
  destinationsModel,
  offersModel,
  pointsModel
});

filterpresentor.init();
boardPresentor.init();

