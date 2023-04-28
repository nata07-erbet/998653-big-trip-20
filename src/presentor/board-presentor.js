// import TripEventAddView from '../view/trip-event-add.js';
import TripEventEditView from '../view/trip-event-edit.js';
import TripEventView from '../view/trip-event.js';
import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventFiltersView from '../view/trip-filters.js';
import TripEventSortView from '../view/trip-sort.js';
import {render} from '../render.js';

export default class BoardPresentor {
  tripEventListComponent = new TripEventListView();

  constructor ({tripMainContainer, tripEventsContainer}) {
    this.tripMainContainer = tripMainContainer;
    this.tripEventsContainer = tripEventsContainer;
  }

  init() {
    render(new TripEventInfoView(), this.tripMainContainer);
    render(new TripEventFiltersView(), this.tripMainContainer);
    render (new TripEventSortView(), this.tripEventsContainer);
    render (new TripEventEditView, this.tripEventsContainer);

    for (let i = 0; i < 3; i++) {
      render(new TripEventView(), this.tripEventListComponent.getElement());
    }

  }
}

