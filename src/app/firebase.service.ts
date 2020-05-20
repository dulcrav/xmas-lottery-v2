import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { PersonAuth } from './model/person-auth.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  authPersonRef: AngularFireObject<any>;
  authPersonsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { }

  getAuthPersons(): AngularFireList<PersonAuth> {
    this.authPersonsRef = this.db.list('auth');
    return this.authPersonsRef;
  }

  updateAuthPerson(key: string, value: any) {
    this.authPersonsRef.update(key, value);
  }

  getAuthPerson(id: string): AngularFireObject<PersonAuth> {
    this.authPersonRef = this.db.object('auth/' + id);
    return this.authPersonRef;
  }

  getAdminPassword() {
    return this.db.object('admin');
  }

  createAuthPerson(name: string, password: string) {
    this.authPersonsRef.push({
      name: name,
      password: password
    });
  }
}
