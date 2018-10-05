export class ShowFlashMessage {
  static readonly type = '[Any component] Show flash message';

  constructor (public message: string) { }
}

export class HideFlashMessage {
  static readonly type = '[Any component] Hide flash message';

  constructor() { }
}
