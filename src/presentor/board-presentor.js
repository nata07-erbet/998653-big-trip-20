import TripEventEditView from '../view/trip-event-edit.js';
import TripEventView from '../view/trip-event.js';
import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventFiltersView from '../view/trip-filters.js';
import TripEventSortView from '../view/trip-sort.js';
import {render, RenderPosition, replace } from '../framework/render.js';
import TripEventNoPointView from '../view/trip-no-point.js';
import TripEventAddView from '../view/trip-event-add.js';

export default class BoardPresentor {
  #tripMainContainer = null;
  #tripEventsContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = null;
  #tripEventListComponent = new TripEventListView();


  constructor ({tripMainContainer, tripEventsContainer, destinationsModel, offersModel, pointsModel}) {
    this.#tripMainContainer = tripMainContainer;
    this.#tripEventsContainer = tripEventsContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;

    this.#points = [...this.#pointsModel.get()];
    this.pointDestination = [...this.#destinationsModel.get()];
    this.pointOffers = [...this.#offersModel.get()];
  }

  init() {

    render(new TripEventInfoView(), this.#tripMainContainer, RenderPosition.AFTERBEGIN);
    render(new TripEventFiltersView(), this.#tripMainContainer);
    render(new TripEventSortView(), this.#tripEventsContainer);

    if(this.#points.length === 0) {
      render(new TripEventNoPointView(), this.#tripEventsContainer);
    }

    render (this.#tripEventListComponent, this.#tripEventsContainer);

    const tripEventAddComponent = new TripEventAddView({
      point: this.#points[0],
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get()
    });
    render (tripEventAddComponent, this.#tripEventsContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }


  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if(evt.key === 'Escape' || evt.key === 'Ecs') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const tripEventViewComponent = new TripEventView({ //pointEditClickHandlerDown
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onClickDown: pointEditClickHandlerDown
    });

    const tripEventViewEditComponent = new TripEventEditView({
      point: this.#points[0],
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onClickUp: pointEditClickHandlerUp,
      onFormSubmit: pointSumitHandler
    });

    function replacePointToForm() {
      replace(tripEventViewEditComponent, tripEventViewComponent);
    }

    function replaceFormToPoint() {
      replace(tripEventViewComponent, tripEventViewEditComponent);
    }

    function pointEditClickHandlerDown() {
      replacePointToForm();
      document.addEventListener('keydown', escKeyDownHandler);
    }

    function pointEditClickHandlerUp() {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    function pointSumitHandler() {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(
      tripEventViewComponent,
      this.#tripEventListComponent.element);
  }


}
