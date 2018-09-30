import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ModelFactoryService } from '../../services/model-factory.service';
import {CreateNewSportObject} from './new-sport-object.actions';

@Component({
  selector: 'app-new-sport-object',
  templateUrl: './new-sport-object.component.html',
  styleUrls: ['./new-sport-object.component.css']
})
export class NewSportObjectComponent implements OnInit {
  sportObject = this.modelFactory.forForm.newSportObject();

  constructor(
    private store: Store,
    private modelFactory: ModelFactoryService
  ) { }

  ngOnInit() {
    console.log(this.sportObject);
  }

  onSubmit() {
    this.store.dispatch(new CreateNewSportObject(this.sportObject));
  }

}
