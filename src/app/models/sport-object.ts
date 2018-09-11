export class SportObject {
  constructor(
    public id: number,
    public coords: Coords
  ) { }
}

export class Coords {
  constructor(
    public latitude: number,
    public longitude: number
  ) {}
}