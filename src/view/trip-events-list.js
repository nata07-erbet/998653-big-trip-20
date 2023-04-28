import { createElement } from '../render.js';

function createEventListTemplate () {
  return (/*html*/`<ul class="trip-events__list">
    </ul>`);
}

export default class TripEventListView {
  element = null;

  getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

