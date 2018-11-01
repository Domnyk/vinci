import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ModelFactoryService } from '../../../../services/model-factory.service';
import { CreateNewSportObject } from './new-sport-object.actions';
import { ShowFlashMessage } from '../../../../actions/flash-message.actions';
import { FormControl, Validators } from '@angular/forms';
import { SportObject } from '../../../../models/sport-object';

@Component({
  selector: 'app-new-sport-object',
  templateUrl: './new-sport-object.component.html',
  styleUrls: ['./new-sport-object.component.css']
})
export class NewSportObjectComponent implements OnInit {
  @Input() sportComplexId: number;

  sportObject: SportObject

  name: FormControl;
  id: FormControl;
  bookingMarginInMonths: FormControl;
  bookingMarginInDays: FormControl;
  street: FormControl;
  buildingNumber: FormControl;
  postalCode: FormControl;
  city: FormControl;

  constructor(
    private store: Store,
    private modelFactory: ModelFactoryService
  ) {
    this.sportObject = this.modelFactory.forForm.newSportObject();

    this.name = new FormControl('', [
      Validators.required
    ]);

    this.id = new FormControl('', [
      Validators.required
    ]);

    this.bookingMarginInMonths = new FormControl('', [
      Validators.required
    ]);

    this.bookingMarginInDays = new FormControl('', [
      Validators.required
    ]);

    this.street = new FormControl('', [
      Validators.required
    ]);

    this.buildingNumber = new FormControl('', [

    ]);

    this.postalCode = new FormControl('', [

    ]);

    this.city = new FormControl('', [

    ]);
  }

  ngOnInit() {
  }


  onSubmit() {
    this.sportObject.sportComplexId = this.sportComplexId;
    this.sportObject.name = this.name.value;
    this.sportObject.bookingMargin = {
      months: this.bookingMarginInMonths.value,
      days: this.bookingMarginInDays.value,
      seconds: 0
    };
    this.sportObject.address = {
        street: this.street.value,
        buildingNumber: this.buildingNumber.value,
        postalCode: this.postalCode.value,
        city: this.city.value
    };

    this.store.dispatch(new CreateNewSportObject(this.sportObject))
      .subscribe(() => this.store.dispatch(new ShowFlashMessage('Nowy obiekt sportowy został dodany')));
  }

}
