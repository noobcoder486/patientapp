import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service';
import { AuthService } from '../services/auth.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private route: Router,
    private authService: AuthService
  ) { }
  

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Username:['',Validators.required],
      Password:['',Validators.required]
    })
  }

  checkFormValidity(form: FormGroup): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    for (const controlName in form.controls) {
      if (form.controls.hasOwnProperty(controlName)) {
        const control = form.controls[controlName];
        if (control.value === '' || control.value === null || control.value === undefined) {
          alert(controlName + " Cannot be Empty")
          return false;
        }
        else if (controlName === 'Username' && !emailRegex.test(control.value)) {
          alert("Invalid email format");
          return false;
        }
      }
    }
    return true;
  }


  Login()
  {
    if(this.checkFormValidity(this.loginForm)){
    const userData = {
      "Username":this.loginForm.controls["Username"].value,
      "Password":this.loginForm.controls["Password"].value
    }
    this.authService.getLoginDetails(userData).subscribe({
      next:(res)=>{
        if(res?.token != undefined || res?.token != null)
        {
          this.route.navigateByUrl('patient-list')
        }
        else
        {
          alert("Username or password is incorrect")
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}


}
