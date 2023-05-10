// import TripEventAddView from '../view/trip-event-add.js';
import TripEventEditView from '../view/trip-event-edit.js';
import TripEventView from '../view/trip-event.js';
import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventFiltersView from '../view/trip-filters.js';
import TripEventSortView from '../view/trip-sort.js';
import {render, RenderPosition} from '../render.js';

export default class BoardPresentor {
  tripEventListComponent = new TripEventListView();

  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel}) {
    this.tripMainContainer = tripMainContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;

    this.points = [...pointsModel. get()];
  }

  init() {

    render(new TripEventInfoView(), this.tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripEventFiltersView(), this.tripMainContainer);
    render (new TripEventSortView(), this.tripEventsContainer);

    render(
      new TripEventEditView({
        point: this.points[0],
        pointDestination: this.destinationsModel.get(),
        pointOffers: this.offersModel.get()
      }),
      this.tripEventsContainer, RenderPosition.BEFOREEND);

    render (this.tripEventListComponent, this.tripEventsContainer);
    this.points.forEach((point) => {
      render(
        new TripEventView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffers: this.offersModel.getByType(point.type)
        }),
        this.tripEventListComponent.getElement());
    });
  }
}
