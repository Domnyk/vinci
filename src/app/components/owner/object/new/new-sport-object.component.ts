import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CreateNewSportObject } from './new-sport-object.actions';
import { ShowFlashMessageOnSuccess } from '../../../../actions/flash-message.actions';
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

  ngOnInit() { }

  createObject() {
    const object = new SportObject();
    object.complexId = this.sportComplexId;
    object.name = this.object.name.value;
    object.bookingMargin = {
      months: +this.object.bookingMarginInMonths.value,
      days: +this.object.bookingMarginInDays.value,
      seconds: 0
    };
    object.address = {
        street: this.object.street.value,
        buildingNumber: this.object.buildingNumber.value,
        postalCode: this.object.postalCode.value,
        city: this.object.city.value
    };

    this.store.dispatch(new CreateNewSportObject(object))
      .subscribe(() => this.store.dispatch(new ShowFlashMessageOnSuccess('Nowy obiekt sportowy został dodany')));
  }
}
