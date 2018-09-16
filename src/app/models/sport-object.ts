export class SportObject {
  constructor(
    public id: number,
    public name: string,
    public geo_coordinates: Coords,
  ) { }
}

export class Coords {
  constructor(
    public latitude: number,
    public longitude: number
  ) { }
}
