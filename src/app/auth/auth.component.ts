import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { PersonAuth } from '../model/person-auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authenticated = false;
  createPersonFormActive = false;
  auth: any;
  inputPassword = '';
  authForm;

  constructor(private firestoreService: FirebaseService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { 
    this.getAuthPerson();
    this.authForm = this.formBuilder.group({
      formName: new FormControl(''),
      formPassword: new FormControl('')
    });
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

  addAuthPerson(name: string, password: string) {
    this.firestoreService.getAuthPersons();
    this.firestoreService.createAuthPerson(name, password);
  }

  logout() {
    this.authenticated = false;
  }

  activateCreatePersonForm() {
    this.createPersonFormActive = true;
  }

  showSuccessSnackbar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000
    });
  }

  onSubmit() {
    this.addAuthPerson(this.authForm.value['formName'], this.authForm.value['formPassword']);
    this.authForm.reset();
    this.showSuccessSnackbar();
  }

  ngOnInit(): void {
  }

}
