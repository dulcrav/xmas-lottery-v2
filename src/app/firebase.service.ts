import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Person } from './model/person.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { PersonAuth } from './model/person-auth.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  personsRef: AngularFireList<Person>;
  personRef: AngularFireObject<Person>;

  authPersonRef: AngularFireObject<any>;
  authPersonsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  createPerson(person: Person) {
    this.personsRef.push({
      name: 'Test Nameee',
      drawnPerson: 'Drawn TEst NAME'
    })
  }

  getPersons(): AngularFireList<Person> {
    this.personsRef = this.db.list('lottery');
    return this.personsRef;
  }

  getAuthPersons(): AngularFireList<PersonAuth> {
    this.authPersonsRef = this.db.list('auth');
    return this.authPersonsRef;
  }

  getAuthPerson(id: string): AngularFireObject<PersonAuth> {
    this.authPersonRef = this.db.object('auth/' + id);
    return this.authPersonRef;
  }

  getAdminPassword() {
    return this.db.object('admin');
  }

  createAuthPerson() {
    this.authPersonsRef.push({
      name: 'Mama',
      password: 'Uk7zSbgXEs'
    });
  }
}
