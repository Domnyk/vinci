import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CurrentUser } from '../../../models/current-user';
import { FormSubmitType } from '../../common/form-submit-button/form-submit-type';
import { OwnerProfile } from '../../../models/owner-profile';
import { UpdateOwner } from './owner-profile.actions';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {
  @Select(state => state.currentUser) currentUser$: Observable<CurrentUser>;

  FormSubmitType = FormSubmitType;

  ownerProfile: OwnerProfile;

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentUser$.subscribe(data => this.fillForm(data));
  }

  fillForm({ id, email, paypalEmail }: CurrentUser) {
    this.ownerProfile = new OwnerProfile({ id, email, paypalEmail });
    this.ownerProfile.isSameEmailForPaypal.valueChanges.subscribe((isSame: boolean) => this.handleSameEmail(isSame));
  }

  handleSameEmail(isSame: boolean) {
    if (isSame) {
      const email = this.ownerProfile.email.value;
      this.ownerProfile.paypalEmail.setValue(email);
    }
  }

  update() {
    this.store.dispatch(new UpdateOwner(this.ownerProfile));
  }
}
