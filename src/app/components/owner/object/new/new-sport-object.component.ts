import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateNewSportObject } from './new-sport-object.actions';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';
import { ObjectFormModel } from '../form-model/object-form-model';
import { SportObject } from '../../../../models/sport-object';

@Component({
  selector: 'app-new-sport-object',
  templateUrl: './new-sport-object.component.html',
  styleUrls: ['./new-sport-object.component.css']
})
export class NewSportObjectComponent implements OnInit {
  @Input() sportComplexId: number;
  object = new ObjectFormModel();
  FormSubmitType = FormSubmitType;

  constructor(private store: Store) { }

  ngOnInit() {
    this.object.complexId = this.sportComplexId;
  }

  createObject() {
    const object = new SportObject(this.object);

    this.store.dispatch(new CreateNewSportObject(object));
  }
}
