import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-auth-navbar",
  templateUrl: "./auth-navbar.component.html",
})
export class AuthNavbarComponent implements OnInit {
  navbarOpen = false;
  userLogin:any;
  constructor(private service: AuthService,private userService: UserService) {
    this.checkLogin()
  }

  ngOnInit(): void {

  }

  checkLogin() {
    this.userService.getUserLoginStatus().subscribe((resData)=>{
      this.userLogin = this.userService.getUserInfo();
    })


  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout(){
    this.service.signout().then(res=>{
      this.userService.logOut();
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
}
