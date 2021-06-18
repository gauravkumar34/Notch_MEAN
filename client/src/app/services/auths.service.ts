import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApicallService } from './api/apicall.service';

@Injectable({
  providedIn: 'root'
})
export class AuthsService {

  constructor(public ApiCallService: ApicallService) { }
  signup(data:any){
    return this.ApiCallService.postData('signup',data);
  }
  signin(data:any){
    return this.ApiCallService.postData('signin',data);
  }
  signout(){
    return this.ApiCallService.getData('signout');
  }
  socailLogin(data:any){
    return this.ApiCallService.postData('socaillogin',data);

  }

}
