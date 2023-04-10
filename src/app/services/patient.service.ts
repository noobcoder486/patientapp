import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Patient } from '../model/patient.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  constructor(
    private httpClient: HttpClient,
    private readonly router: Router
  ) { }

  private patientUrl = 'http://localhost:3000/posts';
  private readonly tokenKey = 'auth_token';


  getPatientList() {
    return this.httpClient.get(this.patientUrl);
  }

  getPatientById(id: number){
    return this.httpClient.get(this.patientUrl + '/' + id).pipe(
      map((patient: any) =>{
        return patient
      }
      )
    );
  }

  getPatientsByName(name: string): Observable<any> {
    return this.httpClient.get<any>(this.patientUrl).pipe(
      map((patients: any[]) => {
        if (name) {
          return patients.filter(patient => 
            patient?.FirstName?.toLowerCase().includes(name.toLowerCase()) || 
            patient?.LastName?.toLowerCase().includes(name.toLowerCase())
          );
        } else {
          return patients;
        }
      })
    );
  }

  createPatient(patient: Patient) {
    return this.httpClient.post<Patient>(this.patientUrl,patient).pipe(
      map((res:Patient)=>{
        return res
      })
    )
  }

  updatePatient(patient: Patient)
  {
    return this.httpClient.put(this.patientUrl + "/" + patient.id, patient).pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  

deletePatient(id: number) {
  return this.httpClient.delete(this.patientUrl+ '/'+id).pipe(map((res:any) =>{
    return res;
  }))
}
}
