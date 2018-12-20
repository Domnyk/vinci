import { Component, HostBinding, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormHelper } from '../../../helpers/form.helper';
import { SelectParams } from './select-params';

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
  }

  ngOnChanges({ readonly }: SimpleChanges) {
    if (!!readonly) {
      this._isReadonly = readonly.currentValue;
    }
  }
}
