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

  constructor ({tripMainContainer, tripEventsContainer, pointModel}) {
    this.tripMainContainer = tripMainContainer;
    this.tripEventsContainer = tripEventsContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.boardPoints = [...this.pointModel.getPoints()];
    this.boardOffers = [...this.pointModel. getOffers()];
    this.boardDestinations = [...this.pointModel.getDestinations()];


    render(new TripEventInfoView(), this.tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripEventFiltersView(), this.tripMainContainer);

    render (new TripEventSortView(), this.tripEventsContainer);
    render(new TripEventEditView({point:this.boardPoints, offers:this.boardOffers, destinations:this.boardDestinations}), this.tripEventsContainer, RenderPosition.BEFOREEND);
    render (this.tripEventListComponent, this.tripEventsContainer);

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new TripEventView({point: this.boardPoints[i]}), this.tripEventListComponent.getElement());
    }

  }
}

