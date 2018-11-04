export class SelectObject {
  static readonly type: string = '[Client] select object with particular id';

  constructor(public id: number) { }
}
