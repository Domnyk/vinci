import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-row',
  templateUrl: './form-row.component.html',
  styleUrls: ['./form-row.component.css']
})
export class FormRowComponent implements OnInit {
  @Input() group?: FormGroup = null;

  rootFormGroup = new FormGroup({});

  constructor() {
  }

  ngOnInit() {
    if (!!this.group) {
      this.rootFormGroup.addControl('row-control', this.group);
    }
  }

}
