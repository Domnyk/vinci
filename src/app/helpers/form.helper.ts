import { AbstractControl } from '@angular/forms';

export class FormHelper {

  /**
   * isFormControlInvalid
   *
   * @param control
   *
   * FormControl is invalid only when it was touched or is in 'dirty' state
   */
  static isFormControlInvalid(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
  }
}
