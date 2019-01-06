import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormHelper } from '../../../helpers/form.helper';
import { SelectParams } from './select-params';
import { AutocompleteType } from './autocomplete-type';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit, OnChanges {
  static readonly DEFAULT_ROOT_CLASS: string = 'form-group';

  @Input() control: FormControl;
  @Input() label: string;
  @Input() type: string;
  @Input() invalidFeedback: string;
  @Input() rootClass?: string;
  @Input() selectParams?: SelectParams;
  @Input() readonly?: boolean;
  @Input() fieldReq?: string;
  @Input() autocomplete?: string;

  /*
    This binding solves problem of .row and .col relationship
    In Bootstrap only columns may be immediate children of rows. However in Angular each component consists of component tag
    and other tags (content). Component tag is parent to other tags. This binding is used to add 'col' class to component tag
    to satisfy Bootstrap requirement
  */
  @HostBinding('class.col') isCol = false;

  isInvalid = FormHelper.isFormControlInvalid;
  _class: string = null;
  _isSelect: boolean = null;
  _isReadonly: boolean = null;
  _autocomplete: string = null;
  showFieldReq = false;

  // TODO: 'new-password' should return AutocompleteType.NEW_PASSWORD but this would require this.type to be 'new-password'
  // TODO: this.type is also used in input as attr.type
  private static getAutocompleteType(inputType: string): AutocompleteType {
    switch (inputType) {
      case 'email':
        return AutocompleteType.EMAIL;
      case 'password':
        return AutocompleteType.CURRENT_PASSWORD;
      case 'new-password':
        return AutocompleteType.CURRENT_PASSWORD;
      case undefined:
        return AutocompleteType.ON;
      case null:
        return AutocompleteType.ON;
      default:
        return AutocompleteType.ON;
    }
  }

  constructor() { }

  ngOnInit() {
    if (this.rootClass === 'col') {
      this.isCol = true;
      this._class = null;
    } else {
      this._class = !!this.rootClass ? this.rootClass : FormFieldComponent.DEFAULT_ROOT_CLASS;
    }

    this._isSelect = this.type === 'select';
    this._isReadonly = !!this.readonly ? this.readonly : false;

    if (!!this.autocomplete) {
      this._autocomplete = this.autocomplete;
    } else {
      this._autocomplete = FormFieldComponent.getAutocompleteType(this.type);
    }

    if (!!this.fieldReq) {
      this.showFieldReq = true;
    }
  }

  ngOnChanges({ readonly }: SimpleChanges) {
    if (!!readonly) {
      this._isReadonly = readonly.currentValue;
    }
  }
}
