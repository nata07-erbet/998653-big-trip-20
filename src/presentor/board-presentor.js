import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventSortView from '../view/trip-sort.js';
import {render, RenderPosition} from '../framework/render.js';
import TripEventNoPointView from '../view/trip-no-point.js';
// import TripEventAddView from '../view/trip-event-add.js';
import PointPresentor from './points-presentor.js';
import {updateItem} from '../utils/utils.js';
import {SortTypes} from '../constants/const.js';
import {sortUp} from '../utils/sort-points.js';

export default class BoardPresentor {
  #tripMainContainer = null;
  #tripEventsContainer = null;
  #destinationsModel = null;
  #pointDestination = null;
  #pointOffers = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #tripEventListComponent = new TripEventListView();
  #sortComponent = null;

  #pointPresentors = new Map();
  #currentSortType = SortTypes.DAY;
  #sourcedListPoints = [];

  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.get()];
    this.#pointDestination = [...this.#destinationsModel.get()];
    this.#pointOffers = [...this.#offersModel.get()];

    this.#sourcedListPoints = [...this.#pointsModel.get()];

    render(new TripEventInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    this.#renderSort();
    // this.#renderNewPoint();

    render (this.#tripEventListComponent, this.#tripEventsContainer);

    this.#renderPoints(this.#points);
    this.#renderNoPoint();
  }

  #handleModeChange = () => {
    this.#pointPresentors.forEach((presentor) => presentor.resetView());
  };

  #renderPoints(points) {
    points.forEach((point) => {
      const pointPresentor = new PointPresentor({
        tripEventListComponent: this.#tripEventListComponent.element,
        destinationsModel: this.#destinationsModel,
        offersModel: this.#offersModel,
        onModeChange: this.#handleModeChange,
        onDataChange: this.#handleDataChange
      });
      pointPresentor.init(point);
      this.#pointPresentors.set(point.id, pointPresentor);
    });
  }

  #clearPointList() {
    this. #pointPresentors.forEach((pointPresentontor) => pointPresentontor.destroy());
    this.#pointPresentors.clear();
    // remove(this.editform)
  }

  #renderPointsList(points) {
    render (this.#tripEventListComponent, this.#tripEventsContainer);

    this.#renderPoints(points);

  }

  #sortPoints(sortType) {
    switch(sortType) {
      case SortTypes.DAY: this.#points.sort(sortUp);
        break;

      case SortTypes.EVENT: this.#points.sort(sortUp);
        break;

      case SortTypes.PRICE: this.#points.sort(sortUp);
        break;

      default:
        this.#points = [...this.#sourcedListPoints];
    }
    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if(this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointsList();
  };

  #renderSort() {
    this.#sortComponent = new TripEventSortView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  // #renderNewPoint() {
  //   const tripEventAddComponent = new TripEventAddView({
  //     point: this.#points[0],
  //     pointDestinations: this.#destinationsModel.get(),
  //     pointOffers: this.#offersModel.get()
  //   });
  //   render (tripEventAddComponent, this.#tripEventsContainer);
  // }

  #renderNoPoint() {
    if(this.#points.length === 0) {
      render(new TripEventNoPointView(), this.#tripEventsContainer);
    }
  }

  #handleDataChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#sourcedListPoints = updateItem(this.#sourcedListPoints, updatedPoint);
    this.#pointPresentors.get(updatedPoint.id).init(updatedPoint);
  };
}
