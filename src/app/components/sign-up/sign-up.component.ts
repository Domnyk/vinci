import { Component, OnInit } from '@angular/core';

import { SignUpService } from '../../services/sign-up.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  model = new User(null, null, null);

  constructor(private signUpService: SignUpService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.signUpService.signUp(this.model)
      .subscribe(this.handleSignUpResponse);
  }

  private handleSignUpResponse(data: any) {
    console.log('Api response: ', data);
  }

  get debugModel() {
    return JSON.stringify(this.model);
  }
}
