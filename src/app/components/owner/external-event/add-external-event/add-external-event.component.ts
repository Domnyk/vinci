import { Component, Input, OnInit } from '@angular/core';
import { FormSubmitType } from '../../../common/form-submit-button/form-submit-type';
import { NewEvternalEvent } from '../../../../models/new-evternal-event';
import { FormHelper } from '../../../../helpers/form.helper';
import { Store } from '@ngxs/store';
import { CreateExternalEvent } from './add-external-event.actions';

@Component({
  selector: 'app-add-external-event',
  templateUrl: './add-external-event.component.html',
  styleUrls: ['./add-external-event.component.css']
})
export class AddExternalEventComponent implements OnInit {
  @Input() arenaId: number;

  newExternalEvent = new NewEvternalEvent();

  FormSubmitType = FormSubmitType;
  isInvalid = FormHelper.isFormControlInvalid;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(new CreateExternalEvent(this.arenaId, this.newExternalEvent));
  }

}
