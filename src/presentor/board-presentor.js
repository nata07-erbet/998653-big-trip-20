// import TripEventAddView from '../view/trip-event-add.js';
import TripEventEditView from '../view/trip-event-edit.js';
import TripEventView from '../view/trip-event.js';
import TripEventListView from '../view/trip-events-list.js';
import TripEventInfoView from '../view/trip-info.js';
import TripEventFiltersView from '../view/trip-filters.js';
import TripEventSortView from '../view/trip-sort.js';
import {render, RenderPosition, replace } from '../framework/render.js';

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
    render (new TripEventSortView(), this.#tripEventsContainer);

    render (this.#tripEventListComponent, this.#tripEventsContainer);

    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });

  }


  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      evt.preventDefault();
    };

    const tripEventViewComponent = new TripEventView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onClickDown: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const tripEventViewEditComponent = new TripEventEditView({
      point: this.#points[0],
      pointDestinations: this.#destinationsModel.get(),
      pointOffers: this.#offersModel.get(),
      onClickUp: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },

      onFormSubmit: () => {
        //что сюда писать?
      }
    });

    function replacePointToForm() {
      replace(tripEventViewEditComponent, tripEventViewComponent);
    }

    function replaceFormToPoint() {
      replace(tripEventViewComponent, tripEventViewEditComponent);
    }


    render(
      tripEventViewComponent,
      this.#tripEventListComponent.element);
  }


}
