import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ModelFactoryService } from '../../../../services/model-factory.service';
import { CreateNewSportObject } from './new-sport-object.actions';
import { ShowFlashMessage } from '../../../../actions/flash-message.actions';

@Component({
  selector: 'app-new-sport-object',
  templateUrl: './new-sport-object.component.html',
  styleUrls: ['./new-sport-object.component.css']
})
export class NewSportObjectComponent implements OnInit {
  @Input() sportComplexId: number;

  sportObject = this.modelFactory.forForm.newSportObject();

  constructor(
    private store: Store,
    private modelFactory: ModelFactoryService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.sportObject.sport_complex_id = this.sportComplexId;

    this.store.dispatch(new CreateNewSportObject(this.sportObject))
      .subscribe(() => this.store.dispatch(new ShowFlashMessage('Nowy obiekt sportowy został dodany')));
  }

}
