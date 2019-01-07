export class ShowFlashMessageOnSuccessfulOperation {
  static readonly type = 'Operation has ended with success';

  constructor (public message: string) { }
}

export class ShowFlashMessageOnError {
  static readonly type = 'Show flash message when action has caused an error';

  constructor (public message: string) { }
}

export class ShowFlashMessageOnCreated {
  static readonly type = 'Entity has been created';

  constructor(public message: string) { }
}

export class ShowFlashMessageOnDeleted {
  static readonly type = 'Entity has been deleted';

  constructor(public message: string) { }
}

export class ShowFlashMessageOnEdited {
  static readonly type = 'Entity has been edited';

  constructor(public message: string) { }
}

export class HideFlashMessage {
  static readonly type = 'Hide flash message';

  constructor() { }
}
