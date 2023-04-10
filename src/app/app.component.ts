import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PatientService } from './services/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  constructor(private authService: AuthService) { }

  title = 'patient-app';

  logout()
  {
    this.authService.logout()
  }
}
