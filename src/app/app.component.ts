import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Loteria świąteczna';

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

  ngOnInit() {
    
  }
}
