import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { PersonAuth } from '../model/person-auth.model';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  constructor(private firestoreService: FirebaseService) { 
    this.getAuthPersons();
  }

  @ViewChild('select') select: MatSelect;
  
  authPersons: PersonAuth[] = [];
  foundPerson: PersonAuth;

  password = '';
  passwordInputDisabled = true;
  userSelected = '';
  loggedIn = false;

  getAuthPersons() {
    this.firestoreService.getAuthPersons().snapshotChanges().subscribe(data => {
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['id'] = item.key;
        this.authPersons.push(a as PersonAuth);
      })});
  }

  changeSelection() {
    this.passwordInputDisabled = false;
    this.foundPerson = this.authPersons.find(person => person.name === this.userSelected);
  }

  get getDrawnPerson(): PersonAuth {
    return this.authPersons.find(person => person.name === this.foundPerson.drawnPerson);
  }

  validatePassword(event: any) {
    if(event.target.value === this.foundPerson.password) {
      this.loggedIn = true;
    }
  }

  ngOnInit(): void {
  }

}
