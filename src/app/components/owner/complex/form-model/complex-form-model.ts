import { FormControl, Validators } from '@angular/forms';

export class ComplexFormModel {
  public name = new FormControl('', [Validators.required]);
  public id = new FormControl(null);

  constructor(name: string = '', id: number = null) {
    this.name.setValue(name);

    if (!!id) {
      this.id.setValue(id);
    }
  }

  isValid(): boolean {
    return [this.name.valid, this.id.valid]
      .reduce((prev: boolean, curr) => prev && curr, true);
  }
}
