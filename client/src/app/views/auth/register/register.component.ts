import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {
  formData:FormGroup;
  constructor(private service: AuthService) {
    this.formData = new FormGroup({
      name: new FormControl(''),
      email:new FormControl(''),
      password:new FormControl('')
    })
  }

  ngOnInit(): void {}


  signup(){
    const dataT ={
      ...this.formData.value
    }
    this.service.signup(dataT).then((resData)=>{
      console.log(resData);
      this.formData.reset();
    }
    ).catch(err=>{
      console.log(err)
    })
  }
}
