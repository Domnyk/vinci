export class UpdateSportObject {
  static readonly type = '[Edit sport object component] Button edit has been clicked';

  constructor(public sportObjectToUpdate: {id: number, name: string, booking_margin: any, address: any, geo_coordinates?: any}) { }
}
