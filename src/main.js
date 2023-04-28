import BoardPresentor from './presentor/board-presentor.js';
// const pageMainContainer = document.querySelector('.page-body__container'); // рисуем loading

const tripMainContainer = document.querySelector('.trip-main'); // рисуем trip-info и btn

const tripEventsContainer = document.querySelector('.trip-events'); //рисуем trip-sort trip-events-list add edit?

const boardPresentor = new BoardPresentor({
  tripMainContainer,
  tripEventsContainer
});
boardPresentor.init();

