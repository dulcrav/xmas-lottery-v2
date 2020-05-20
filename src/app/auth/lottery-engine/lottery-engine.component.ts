import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase.service';
import { PersonAuth } from 'src/app/model/person-auth.model';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-lottery-engine',
  templateUrl: './lottery-engine.component.html',
  styleUrls: ['./lottery-engine.component.css']
})
export class LotteryEngineComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { 
    this.getAuthPersons();
  }

  authPersons: PersonAuth[] = [];
  displayedColumns: string[] = ['name', 'drawnPerson'];
  lotteryParticipants: string[] = [];

  lotteryResults = [];

  drawnParticipant = '';
  drawnPerson = '';

  drawLotsv2() {
    this.populateLotteryParticipants();
    var tempArray = [...this.lotteryParticipants];

    for (let i = tempArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * tempArray.length);
      [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
    }
  
    this.lotteryResults = [...tempArray];

    for(let i=0; i<this.lotteryParticipants.length; i++) {
      this.updatePerson(this.lotteryParticipants[i], this.lotteryResults[i]);
    }

    this.authPersons.forEach(person => this.updateAuthPerson(person));
    this.clearArrays();
  }

  populateLotteryParticipants() {
    this.authPersons.forEach(person => this.lotteryParticipants.push(person.name));
  }

  getAuthPersons() {
    this.firebaseService.getAuthPersons().snapshotChanges().subscribe(data => {
      data.forEach(item => {
        let a = item.payload.toJSON();
        a['id'] = item.key;
        this.authPersons.push(a as PersonAuth);
      })});
  }

  updatePerson(name: string, newDrawnPerson: string) {
    let index = this.authPersons.findIndex(person => person.name == name);
    let person = this.authPersons[index];
    person.drawnPerson = newDrawnPerson;
    this.authPersons[index] = person;
  }

  updateAuthPerson(person: PersonAuth) {
    this.firebaseService.updateAuthPerson(person.id, {
      name: person.name,
      drawnPerson: person.drawnPerson,
      password: person.password
    });
  }

  clearArrays() {
    this.lotteryParticipants = [];
    this.lotteryResults = [];
  }

  ngOnInit(): void {
  }

}
