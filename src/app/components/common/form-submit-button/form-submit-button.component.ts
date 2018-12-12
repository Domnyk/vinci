import { Component, Input, OnInit } from '@angular/core';
import { FormSubmitType } from './form-submit-type';

@Component({
  selector: 'app-form-submit-button',
  templateUrl: './form-submit-button.component.html',
  styleUrls: ['./form-submit-button.component.css']
})
export class FormSubmitButtonComponent implements OnInit {
  @Input() text: string;
  @Input() isValid: boolean;
  @Input() submitType?: FormSubmitType;

  private _submitType: FormSubmitType = null;

  constructor() { }

  ngOnInit() {
    this._submitType = !!this.submitType ? this.submitType : FormSubmitType.OTHER;
  }

  get color(): string {
    switch (this._submitType) {
      case FormSubmitType.CREATE:
        return 'btn-success';
      case FormSubmitType.DESTROY:
        return 'btn-danger';
      case FormSubmitType.OTHER:
        return 'btn-primary';
    }
  }

  get class(): string {
    return `btn ${this.color}`;
  }

  get isDisabled(): boolean {
    // return !this.isValid;
    // TODO: Delete line below and uncommnet line above when component is finished
    return false;
  }

}
