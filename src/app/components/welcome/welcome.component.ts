import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.dev';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  backendSignInAddress = environment.api.urls.signIn();

  constructor() { }

  ngOnInit() { }

}
