import { Component, OnInit } from '@angular/core';
import * as Profiles from '../../../models/profile';
import { FormSubmitType } from '../../common/form-submit-button/form-submit-type';
import { Select } from '@ngxs/store';
import { CurrentUser, CurrentUserData } from '../../../models/current-user';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Select(state => state.currentUser) currentUser$: Observable<CurrentUser>;

  FormSubmitType = FormSubmitType;

  clientProfile: Profiles.ClientProfile;

  constructor() { }

  ngOnInit() {
    this.currentUser$
      .pipe(
        flatMap(currentUser => of(currentUser.data))
      )
      .subscribe(data => this.handleCurrentUserDate(data));
  }

  handleCurrentUserDate(data: CurrentUserData) {
    const profileData: Profiles.ProfileData = { displayName: data.displayName, email: data.email,
      isSameEmailForPaypal: false };

    this.clientProfile = new Profiles.ClientProfile(profileData);
    this.clientProfile.isSameEmailForPaypal.valueChanges.subscribe((value: boolean) => this.handleSameEmail(value));
  }

  handleSameEmail(value: boolean) {
    if (value) {
      const email = this.clientProfile.email.value;
      this.clientProfile.paypalEmail.setValue(email);
    }
  }

  get readonly(): boolean {
    return this.clientProfile.isSameEmailForPaypal.value;
  }
}
