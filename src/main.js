import BoardPresentor from './presentor/board-presentor.js';
import PointModel from './model/point-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const pointModel = new PointModel();
const boardPresentor = new BoardPresentor({
  tripMainContainer,
  tripEventsContainer,
  pointModel
});
boardPresentor.init();

