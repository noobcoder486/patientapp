import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientListComponent } from './Patient/patient-list/patient-list.component';
import { PatientDetailsComponent } from './Patient/patient-details/patient-details.component';
import { AddEditPatientComponent } from './Patient/add-edit-patient/add-edit-patient.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'patient-list',
    component: PatientListComponent,
  },
  {
    path: 'patient-details',
    component: PatientDetailsComponent
  },
  {
    path: 'create-patient',
    component: AddEditPatientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
