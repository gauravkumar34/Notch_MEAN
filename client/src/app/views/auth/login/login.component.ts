import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { AuthsService } from "src/app/services/auths.service";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private service: AuthsService, private authService: SocialAuthService, private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email : new FormControl(),
      password : new FormControl()
    })
    this.userService.getUserLoginStatus().subscribe((resData) => {
      if (this.userService.getUserInfo()) this.router.navigate(["/profile"]);
    });
  }
  userInfo : any;
  ngOnInit(): void {

  }
  googlelogin:any;
  googleAuth(){
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x) => {
      this.googlelogin = x;
      this.userService.addUserInfo(this.googlelogin);
      if (this.googlelogin) {
        console.log("LoginComponent -> signInWithGoogle -> this.googleLogin",this.googlelogin);
      }
      const data = {
        email: this.googlelogin.email,
        name: this.googlelogin.name,
        authToken: this.googlelogin.authToken,
        idToken: this.googlelogin.idToken,
        photoUrl: this.googlelogin.photoUrl,
        provider: this.googlelogin.provider,
      }
      this.service.socailLogin(data)
        .then((resData: any) => {
          console.log(resData)
        this.router.navigate(["/profile"])
        })
        .catch((error) => {
          console.log("RegisterComponent -> onSubmit -> error", error);
        });
    });
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
