import { FormControl, Validators } from '@angular/forms';

export class ComplexFormModel {
  public name = new FormControl('', [Validators.required]);
  public id: number = null;

  constructor(name: string = '', id: number = null) {
    this.name.setValue(name);

    if (!!id) {
      this.id = id;
    }
  }

  isValid(): boolean {
    return this.name.valid;
  }
}
