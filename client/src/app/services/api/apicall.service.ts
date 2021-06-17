import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  token: any = {};
  protected baseUrl: string = environment.apiUrl;
  uploadSub = new BehaviorSubject<any>(0);
  constructor(private https: HttpClient, public userService: UserService) { }



  setHeaderToken(token) {
    this.token = token;
  }

  getHeader() {
    const token = this.userService.getUserToken();
    this.token = token ? token : '';
    return {
      headers: {
        authorization: this.token
      }
    };
  }


  public getData(subUrl: string, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: string = this.baseUrl + subUrl;
      // // console.log('data', request);
      this.https
        .get(request,
          token ? this.getHeader() : {})
          .subscribe(
            data => resolve(data),
            error =>{
              if(error.status === 401){
                this.userService.logOut();
               }
              reject(error)
            }
          );
    });
  }

  public postData(subUrl: string, data: any, token = true): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('Token :', token);
      // console.log('Data :', this.getHeader());
      const request: string = this.baseUrl + subUrl;
      this.https.post(request, data, token ? this.getHeader() : {})
        .subscribe(
          res => resolve(res),
          error => {
            if(error.status === 401){
              this.userService.logOut();
             }
            reject(error);
          }
        );
    });
  }
}
