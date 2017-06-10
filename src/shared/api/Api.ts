import HttpActions from './HttpActions';

interface ICategoriesResponse {
  categories: Array<{ name: string, id: number }>;
}

interface IFieldsResponse {
  fields: object;
}

class Api {
  private actions: HttpActions;

  constructor(public baseUrl: string, public version: string = 'v1') {
    this.actions = new HttpActions(`${baseUrl}/${version}`);
  }
}

export { ICategoriesResponse, IFieldsResponse };
export default Api;
