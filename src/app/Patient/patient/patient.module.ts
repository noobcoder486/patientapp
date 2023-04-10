import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PatientListComponent } from '../patient-list/patient-list.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { AddEditPatientComponent } from '../add-edit-patient/add-edit-patient.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PatientListComponent,
    PatientDetailsComponent,
    AddEditPatientComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
  ]
})
export class PatientModule { }
