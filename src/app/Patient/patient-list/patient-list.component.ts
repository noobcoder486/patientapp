import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/model/patient.model';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { AddEditPatientComponent } from '../add-edit-patient/add-edit-patient.component';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private patientService: PatientService,
    private route: Router,
    public matDialog: MatDialog,
    private authService: AuthService,
  ) {
  }

  name: any;
  patientDetailsObj !: Patient
  output: any[] = []
  patientCreatedSubscription: any;

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.route.navigateByUrl('login')
      alert("You are not authenticated")
    }
    else {
      this.getPatientList()
    }
  }

  getPatientList() {
    this.output = []
    this.patientService.getPatientList().subscribe({
      next: (PatientArray: any) => {
        console.log(PatientArray)
        if (Array.isArray(PatientArray)) {
          this.output = PatientArray
        }
        else {
          this.output.push(PatientArray)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  searchPatient(text: any) {
    this.output = []
    this.patientService.getPatientsByName(text).subscribe({
      next: (Patient) => {
        console.log(Patient)
        if (Array.isArray(Patient)) {
          this.output = Patient
        }
        else {
          this.output.push(Patient)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  viewPatient(item: any) {
    var myObject = {
      patientData: item,
      isEdit: false
    };
    const dialogRef = this.matDialog.open(PatientDetailsComponent, { data: myObject })
  }

  patientEditView(item: any) {
    var myObject = {
      patientData: item,
      isEdit: true
    };
    const dialogRef = this.matDialog.open(PatientDetailsComponent, {
      data: myObject
    })
  }

  deletePatient(item: any) {
    let id = item.id
    this.patientService.deletePatient(item.id).subscribe({
      next: (res) => {
        alert("Patient with Id :" + " " + id + "Is Deleted")
        this.getPatientList()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onPatientAdded(patient: Patient) {
    this.getPatientList();
  }
}
