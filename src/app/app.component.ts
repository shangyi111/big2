import { Component } from '@angular/core';
import { getCardById } from './cards';
import { isValid } from './rules';
import { computerSubmits } from './AI';
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
  lastSubmittedPlayerId;



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
      let cards;

      if (activePlayer.length && this.activeAt > 0) {
        if(this.lastSubmittedPlayerId === this.activeAt) cards = computerSubmits(this.players, this.activeAt,[]);
        else cards = computerSubmits(this.players, this.activeAt,this.submittedCardIds);
        if(!cards.length) this.submittedCardIds = this.submittedCardIds;
        else if(cards.length>0) {
            this.submittedCardIds = cards;
            this.lastSubmittedPlayerId = this.activeAt;
            this.players[this.activeAt] = this.players[this.activeAt].filter((each) => !this.submittedCardIds.includes(each));
        }
      }
      this.autoPlay(n-1, 2000);
    }, period)
  }
  

  getPlayerSelectedCards(selectedCardIds) {
    this.selectedCardIds = selectedCardIds;
    if(this.lastSubmittedPlayerId === 0){
        this.isValidStatus = isValid(selectedCardIds, []);
    }else{
        this.isValidStatus = isValid(selectedCardIds, this.submittedCardIds);
    }
    
  }

  clickSubmitHandler(){
    this.isValidStatus = false;
  	this.isPlayCards = !this.isPlayCards; 
     //what this means?
    if(this.lastSubmittedPlayerId === 0){
        isValid(this.selectedCardIds, [])
    }else{
        isValid(this.selectedCardIds, this.submittedCardIds)
    }
    this.submittedCardIds = this.selectedCardIds;
    this.lastSubmittedPlayerId = 0;
    this.players[0] = this.players[0].filter((each) => !this.submittedCardIds.includes(each));
    this.autoPlay(3, 3000);

  }

  clickPassHandler(){
    this.autoPlay(3,0);
  }
  






}

