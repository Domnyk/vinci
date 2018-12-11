import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-submit-button',
  templateUrl: './form-submit-button.component.html',
  styleUrls: ['./form-submit-button.component.css']
})
export class FormSubmitButtonComponent implements OnInit {
  static readonly DEFAULT_CLASS = 'btn btn-primary';

  @Input() text: string;
  @Input() formValidator: () => boolean;
  @Input() class?: string;

  _class: string = null;

  constructor() { }

  ngOnInit() {
    this._class = !!this.class ? this.class : FormSubmitButtonComponent.DEFAULT_CLASS;
  }

}
