import { Component, OnInit, Input } from '@angular/core';
import { PersonAuth } from 'src/app/model/person-auth.model';

@Component({
  selector: 'app-user-loggedin',
  templateUrl: './user-loggedin.component.html',
  styleUrls: ['./user-loggedin.component.css']
})
export class UserLoggedinComponent implements OnInit {

  @Input() authPerson: PersonAuth;
  constructor() { }

  ngOnInit(): void {
  }

}
