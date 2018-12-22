export class ShowFlashMessageOnSuccess {
  static readonly type = 'Show flash message when action has been successful';

  constructor (public message: string) { }
}

export class ShowFlashMessageOnError {
  static readonly type = 'Show flash message when action has caused an error';

  constructor (public message: string) { }
}

export class HideFlashMessage {
  static readonly type = 'Hide flash message';

  constructor() { }
}
