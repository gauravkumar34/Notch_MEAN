import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private service: AuthService,private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email : new FormControl(),
      password : new FormControl()
    })
    this.userService.getUserLoginStatus().subscribe((resData) => {
      if (this.userService.getUserInfo()) this.router.navigate(["/profile"]);
    });
  }
  ngOnInit(): void {

  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const data = {
      ...this.loginForm.value,
    };
    console.log(this.loginForm.value)
    this.service.signin(data).then(res => {
      console.log(res)
      if(res.status == "SUCCESS")
      {
        this.userService.addUserInfo(res.data);
        this.router.navigate(["/profile"])
      }
    }) .catch((error) => {
      console.log("RegisterComponent -> onSubmit -> error", error);
      if (error && error.error && error.error.message) {
        console.log("error", "Login Faild", error.error.message);
      } else {
       console.log("error", "Login Faild", error.message);
      }
    });
  }


}
