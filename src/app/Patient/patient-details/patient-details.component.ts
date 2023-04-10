import { Component, OnInit,Inject, Input, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from 'src/app/model/patient.model';
import { PatientListComponent } from '../patient-list/patient-list.component';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  @ViewChild (PatientListComponent) patientList !: PatientListComponent
  constructor(
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PatientDetailsComponent>,
    private formBuilder: FormBuilder
  ) { }

  patientForm! : FormGroup
  isEdit: boolean = false;
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

  checkFormValidity(form: FormGroup): boolean {
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
      }
    }
    return true;
  }

  ngOnInit(): void {
    console.log(this.data.isEdit)
    this.isEdit = this.data.isEdit
    this.getPatientDetails(this.data.patientData.id)
    this.patientForm = this.formBuilder.group({
      "FirstName":['',Validators.required],
      "LastName":['',Validators.required],
      "Email":['',(Validators.required,Validators.email)],
      "Phone":['',Validators.required],
      "Address1":['', Validators.required],
      "Address2":['',Validators.required],
      "City":['',Validators.required],
      "State":['', Validators.required],
      "ZipCode":['',Validators.required]
    })
  }

  getPatientDetails(id:any)
  {
    this.patientService.getPatientById(parseInt(id)).subscribe({
      next:(patienDetail) =>{
        console.log(patienDetail)
        this.newPatient.id = patienDetail.id
        this.patientForm.patchValue({
          "FirstName":patienDetail.FirstName,
          "LastName": patienDetail.LastName,
          "Email": patienDetail.Email,
          "Phone": patienDetail.Phone,
          "Address1":patienDetail.Address1,
          "Address2":patienDetail.Address2,
          "City":patienDetail.City,
          "State":patienDetail.State,
          "ZipCode":patienDetail.ZipCode
        })
        if(this.isEdit == false)
        {
          this.patientForm.disable()
        }
        
      }
    })
  }

  updatePatient()
  {
    if(this.checkFormValidity(this.patientForm)){
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
    this.patientService.updatePatient(this.newPatient).subscribe({
      next:(res) =>{
        alert("Patient Details Updated Successfully")
        this.dialogRef.close()
        this.patientList.getPatientList()
      },
      error:(err) =>{
        console.log(err)
      }
    })
  }
}


}
