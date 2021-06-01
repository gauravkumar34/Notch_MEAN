import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  API = 'http://localhost:8000/api/'
  signup(data:any){
    return this.http.post(this.API+'signup',data);
  }
}
