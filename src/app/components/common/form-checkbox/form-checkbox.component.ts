import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.css']
})
export class FormCheckboxComponent implements OnInit {
  static readonly DEFAULT_ROOT_CLASS: string = 'form-check';

  @Input() control: FormControl;
  @Input() label: string;
  @Input() rootClass?: string;

  /*
    This binding solves problem of .row and .col relationship
    In Bootstrap only columns may be immediate children of rows. However in Angular each component consists of component tag
    and other tags (content). Component tag is parent to other tags. This binding is used to add 'col' class to component tag
    to satisfy Bootstrap requirement
  */
  @HostBinding('class.col') isCol = false;

  _class: string = null;

  constructor() { }

  ngOnInit() {
    if (this.rootClass === 'col') {
      this.isCol = true;
      this._class = null;
    } else {
      this._class = !!this.rootClass ? this.rootClass : FormCheckboxComponent.DEFAULT_ROOT_CLASS;
    }
  }

}
