import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { ThemePalette } from '@angular/material/core';
import { Person } from '../model/person.model';
import { PersonAuth } from '../model/person-auth.model';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.css']
})
export class UserSelectionComponent implements OnInit {

  constructor(private firestoreService: FirebaseService) { }

  color: ThemePalette = 'primary';
  //mode: ProgressSpinnerMode = 'determinate';
  //value = 50;

  title = 'Loteria świąteczna';

  password = '';

  persons: Person[]; 
  authPersons: PersonAuth[];

  isPasswordIncorrect = false;

  spinnerDisplayed = false;
  resultDisplayed = false;

  drawnParticipant = '';
  drawnPerson = '';

  lotteryParticipants = ["Tata", "Mama", "Michał", "Tomek", "Adam", "Marcin", "Ola", "Patrycja", "Kasia"];
  lotteryChosen = ["Tata", "Mama", "Michał", "Tomek", "Adam", "Marcin", "Ola", "Patrycja", "Kasia"];

  lotteryResults = [];

  drawLots() {
    if (this.lotteryParticipants.length > 0) {

      this.resultDisplayed = false;

      let drawnParticipantIndex = Math.floor(Math.random() * this.lotteryParticipants.length);
      console.log(this.lotteryParticipants[drawnParticipantIndex]);
      this.drawnParticipant = this.lotteryParticipants[drawnParticipantIndex];
  
      let drawnPerson = '';
      let drawnPersonIndex: number;
  
      do {
        drawnPersonIndex = Math.floor(Math.random() * this.lotteryChosen.length);
        drawnPerson = this.lotteryChosen[drawnPersonIndex];
      } while(drawnPerson === this.drawnParticipant);

      console.log(drawnPerson);
      this.drawnPerson = drawnPerson;

      this.displaySpinner(this.drawnParticipant, this.drawnPerson, drawnParticipantIndex, drawnPersonIndex);
    }
    
  }

  displaySpinner(drawnParticipant: string, drawnPerson: string, drawnParticipantIndex: number, drawnPersonIndex: number) {
    this.spinnerDisplayed = true;
    setTimeout(() => {
      this.displayResults(drawnParticipant, drawnPerson, drawnParticipantIndex, drawnPersonIndex);
      this.spinnerDisplayed = false;
      this.resultDisplayed = true;
     }, 3000);
    
  }

  displayResults(drawnParticipant: string, drawnPerson: string, drawnParticipantIndex: number, drawnPersonIndex: number) {
      this.lotteryResults.push({participant: this.drawnParticipant, drawn: this.drawnPerson});
  
      this.lotteryParticipants.splice(drawnParticipantIndex, 1);
      this.lotteryChosen.splice(drawnPersonIndex, 1);
  }

  create() {
    this.firestoreService.getPersons();
    let person = new Person('Name', 'Drawn Name');
    this.firestoreService.createPerson(person);
  }

  getPersons() {
    this.firestoreService.getPersons().valueChanges().subscribe(data => this.persons = data);
  }

  getAuthPerson() {
    this.firestoreService.getAuthPersons().snapshotChanges().subscribe(data => {
      data.forEach(item => {
        this.authPersons = [];
        let a = item.payload.toJSON();
        a['id'] = item.key;
        this.authPersons.push(a as PersonAuth);
      })});
  }

  createAuthPerson() {
    this.firestoreService.getAuthPersons();
    this.firestoreService.createAuthPerson();
  }

  submitPassword() {
    console.log(this.authPersons[0]);
    console.log(this.authPersons[0].password);
    console.log(this.password);
    if(this.authPersons[0].password === this.password) {
      this.isPasswordIncorrect = false;
    } else {
      this.isPasswordIncorrect = true;
    }
  }


  ngOnInit(): void {
  }

}
