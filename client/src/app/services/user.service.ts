import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo = new BehaviorSubject(null);
  constructor(public storage: CookieService,public Router:Router) { }

  getUserLoginStatus() {
    return this.userInfo;
  }

  getUserInfo() {
    // console.log("UserService -> getUserInfo -> this.storage.get('userInfo_Notch')", this.storage.get('userInfo_Notch'))
    if (this.storage.get('userInfo_Notch')) {
      return JSON.parse(this.storage.get('userInfo_Notch'));
    } else {
      return false;
    }
  }


  addUserInfo(data) {
    this.storage.set('userInfo_Notch', JSON.stringify(data));
    this.storage.set('userInfo_token', data.token);
    this.userInfo.next(data);
    return;
  }
  logOut() {
    this.storage.deleteAll();
    this.userInfo.next(null);
    this.Router.navigate([""])
  }

  getUserToken() {
    if (this.storage.get('userInfo_Notch')) {
      return this.storage.get('userInfo_token');
    } else {
      return false;
    }
  }
}
