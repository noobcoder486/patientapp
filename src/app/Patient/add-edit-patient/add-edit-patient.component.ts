import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient.model';
import { AuthService } from 'src/app/services/auth.service';
import { PatientService } from 'src/app/services/patient.service';
import { PatientListComponent } from '../patient-list/patient-list.component';

@Component({
  selector: 'app-add-edit-patient',
  templateUrl: './add-edit-patient.component.html',
  styleUrls: ['./add-edit-patient.component.css']
})
export class AddEditPatientComponent implements OnInit {

  @ViewChild(PatientListComponent) patientList !: PatientListComponent;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private authService: AuthService,
    private route: Router
  ) { }

  patientForm!: FormGroup
  newPatient: Patient = {
    id: 0,
    FirstName: '',
    LastName: '',
    Phone: '',
    Email: '',
    Address1: '',
    Address2: '',
    City: '',
    State: '',
    ZipCode: '',

  }


  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.route.navigateByUrl('login')
      alert("You are not authenticated")
    }
    else {
      this.patientForm = this.formBuilder.group({
        "FirstName": ['', Validators.required],
        "LastName": ['', Validators.required],
        "Email": ['', [Validators.required, Validators.email]],
        "Phone": ['', Validators.required],
        "Address1": ['', Validators.required],
        "Address2": ['', Validators.required],
        "City": ['', Validators.required],
        "State": ['', Validators.required],
        "ZipCode": ['', Validators.required]
      });
    }
  }

  checkFormValidity(form: FormGroup): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    for (const controlName in form.controls) {
      if (form.controls.hasOwnProperty(controlName)) {
        const control = form.controls[controlName];
        if (control.value === '' || control.value === null || control.value === undefined) {
          alert(controlName + " Cannot be Empty")
          return false;
        } else if (controlName === 'Phone' && control.value.toString().length !== 10) {
          alert(controlName + " must be 10 digits")
          return false;
        } else if (controlName === 'ZipCode' && control.value.toString().length !== 6) {
          alert(controlName + " must be 6 digits")
          return false;
        }
        else if (controlName === 'Email' && !emailRegex.test(control.value)) {
          alert("Invalid email format");
          return false;
        }
      }
    }
    return true;
  }

  createPatient() {
    if (this.checkFormValidity(this.patientForm)) {
      this.newPatient.FirstName = this.patientForm.controls["FirstName"].value
      this.newPatient.LastName = this.patientForm.controls["LastName"].value
      this.newPatient.Email = this.patientForm.controls["Email"].value
      this.newPatient.Phone = this.patientForm.controls["Phone"].value
      this.newPatient.Address1 = this.patientForm.controls["Address1"].value
      this.newPatient.Address2 = this.patientForm.controls["Address2"].value
      this.newPatient.City = this.patientForm.controls["City"].value
      this.newPatient.State = this.patientForm.controls["State"].value
      this.newPatient.ZipCode = this.patientForm.controls["ZipCode"].value
      console.log(this.newPatient)
      this.patientService.createPatient(this.newPatient).subscribe({
        next: (res) => {
          alert("Patient Created Successfully")
          this.patientList.ngOnInit()
          this.patientForm.reset()
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  logout() {
    this.authService.logout()
  }

}
