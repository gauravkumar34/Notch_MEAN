import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthsService } from "src/app/services/auths.service";
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  formData:FormGroup;
  constructor(private service: AuthsService, private userService: UserService,private authService: SocialAuthService, private router: Router) {
    this.formData = new FormGroup({
      name: new FormControl(''),
      email:new FormControl(''),
      password:new FormControl('')
    })
  }

  googlelogin:any;
  ngOnInit(): void {

  }
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
  signup(){
    const dataT ={
      ...this.formData.value
    }
    this.service.signup(dataT).then((resData)=>{
      console.log(resData);
      this.formData.reset();
      this.router.navigate(["/auth/login"])
    }
    ).catch(err=>{
      alert('Password Must be of atleast 6 char');
      console.log(err)
    })
  }
}
