import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private readonly existingUserCookieName = 'existingUser';

  constructor(
    private cookieService: CookieService
  ) { }

  // TODO: Add secuirty options for cookie
  ngOnInit() {
    const isNewUser = !this.cookieService.check(this.existingUserCookieName);
    if (isNewUser) {
      this.cookieService.set(this.existingUserCookieName, 'Vinci@2018');
    }
  }

}
