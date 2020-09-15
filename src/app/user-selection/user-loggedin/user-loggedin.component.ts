import { Component, OnInit, Input } from '@angular/core';
import { PersonAuth } from 'src/app/model/person-auth.model';
import { FirebaseService } from 'src/app/firebase.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/auth/snackbar/snackbar.component';

@Component({
  selector: 'app-user-loggedin',
  templateUrl: './user-loggedin.component.html',
  styleUrls: ['./user-loggedin.component.css']
})
export class UserLoggedinComponent implements OnInit {

  @Input() loggedInUser: PersonAuth;
  @Input() drawnPerson: PersonAuth;
  form: FormGroup;

  constructor(private firestoreService: FirebaseService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.form = this.formBuilder.group({
      formWishes: new FormControl('')
    });
    
   }

  addWishes(wishes: string) {
    this.firestoreService.updateAuthPerson(this.loggedInUser.id, {
      wishes: wishes
    });
  }

  showSuccessSnackbar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000
    });
  }

  onSubmit() {
    this.addWishes(this.form.value['formWishes']);
    this.showSuccessSnackbar();
  }

  ngOnInit(): void {
  }

}
