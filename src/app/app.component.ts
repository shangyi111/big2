import { Component } from '@angular/core';
import { getCardById } from './cards';
import { isValid } from './rules';
import { oneCard } from './AI';
import { gameStart } from './gameStart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'big2';
  players = [[], [], [], []];
  activeAt = 0;
  isValidStatus : boolean = false;
  submittedCardIds=[];
  selectedCardIds = [];
  isPlayCards: boolean;



  constructor() {
  	gameStart(51,this.players);
  }

  autoPlay(n, period) {
    if (n < 0) return;
    setTimeout(() => {
      console.log(this.activeAt);
      this.activeAt += 1
      this.activeAt %= 4
      // activePlayer is cards of activePlayer has
      const activePlayer = this.players[this.activeAt];
      if (activePlayer.length && this.activeAt > 0) {
        const card = oneCard(this.players, this.activeAt,this.submittedCardIds);
        this.submittedCardIds = card ? [card] : this.submittedCardIds;
      }
     
      this.autoPlay(n-1, 3000);
    }, period)
  }
  

  getPlayerSelectedCards(selectedCardIds) {
    this.selectedCardIds = selectedCardIds;
    this.isValidStatus = isValid(selectedCardIds, this.submittedCardIds);
  }

  clickSubmitHandler(){
    this.isValidStatus = false;
  	this.isPlayCards = !this.isPlayCards; 
     //what this means?
  	if(isValid(this.selectedCardIds, this.submittedCardIds)){
      this.submittedCardIds = this.selectedCardIds;
      // this.lastSubmittedPlayerId = 
      this.players[0] = this.players[0].filter((each) => !this.submittedCardIds.includes(each));
      //players[2] player cards by taking out submitted cards
      this.autoPlay(3, 0);
    } 


  }

  clickPassHandler(){
    this.autoPlay(3,0);
  }
  






}

