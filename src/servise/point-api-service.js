import ApiService from '../framework/api-service.js';


const Metod = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE '
};

export default class PointService extends ApiService {
  //получение от сервера всех задач
  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  get points() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  async updatePoint(update) {
    const response = await this._load({
      url: `points/${update.id}`,
      method: Metod.PUT,
      body: JSON.stringify(update),
      headers:new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addPoints() {
    const response = await this._load({
      url: 'points',
      method: Metod.POST,
      // body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Metod.DELETE
    });
    return response;
  }

  // #adaptToServer(point) {
  //   const updatePoints = {
  //     ...point,
  //     date_from: point.dateFrom
  //   };

  // }
}
