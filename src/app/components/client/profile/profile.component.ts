import { Component, OnInit } from '@angular/core';
import * as Profiles from '../../../models/client-profile';
import { FormSubmitType } from '../../common/form-submit-button/form-submit-type';
import { Select, Store } from '@ngxs/store';
import { CurrentUser } from '../../../models/current-user';
import { Observable, of } from 'rxjs';
import { UpdateClient } from './profile.actions';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Select(state => state.currentUser) currentUser$: Observable<CurrentUser>;

  FormSubmitType = FormSubmitType;

  clientProfile: Profiles.ClientProfile;

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentUser$.subscribe(data => this.fillForm(data));
  }

  fillForm(user: CurrentUser) {
    const profileData: Profiles.ProfileData = { displayName: user.displayName, email: user.email, id: user.id,
      isSameEmailForPaypal: user.email === user.paypalEmail, paypalEmail: user.paypalEmail };

    this.clientProfile = new Profiles.ClientProfile(profileData);
    this.clientProfile.isSameEmailForPaypal.valueChanges.subscribe((isSame: boolean) => this.handleSameEmail(isSame));
  }

  handleSameEmail(isSame: boolean) {
    if (isSame) {
      const email = this.clientProfile.email.value;
      this.clientProfile.paypalEmail.setValue(email);
    }
  }

  get isPaypalEmailReadonly(): boolean {
    return this.clientProfile.isSameEmailForPaypal.value;
  }

  update() {
    this.store.dispatch(new UpdateClient(this.clientProfile));
  }
}
