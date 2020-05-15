import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authenticated = false;
  auth: any;
  inputPassword = '';

  constructor(private firestoreService: FirebaseService) { 
    this.getAuthPerson();
  }

  validatePassword(event: any) {
    if(event.target.value === this.auth.password) {
      this.authenticated = true;
    }
  }

  getAuthPerson() {
    this.firestoreService.getAdminPassword().snapshotChanges().subscribe(data => {
      this.auth = data.payload.toJSON() });
  }

  logout() {
    this.authenticated = false;
  }

  ngOnInit(): void {
  }

}
