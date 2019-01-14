import { Component, OnInit } from '@angular/core';
import { FormSubmitType } from '../../common/form-submit-button/form-submit-type';
import { Select, Store } from '@ngxs/store';
import { CurrentUser } from '../../../models/current-user';
import { Observable } from 'rxjs';
import { UpdateClient } from './profile.actions';
import { ClientProfile } from '../../../models/client-profile';


@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  @Select(state => state.currentUser) currentUser$: Observable<CurrentUser>;

  FormSubmitType = FormSubmitType;

  clientProfile: ClientProfile;

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentUser$.subscribe(data => this.fillForm(data));
  }

  fillForm({ id, displayName, paypalEmail }: CurrentUser) {
    this.clientProfile = new ClientProfile({ id, displayName, paypalEmail });
  }

  update() {
    this.store.dispatch(new UpdateClient(this.clientProfile));
  }
}
