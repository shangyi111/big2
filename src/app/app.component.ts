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
  turn = 0;



  constructor() {
  	gameStart(51,this.players);
    for(let i=0; i<4; i++){
      if(this.players[i].includes(0)){
        this.lastSubmittedPlayerId = this.activeAt = (i + 3) % 4;       
      }
    }
    // this.lastSubmittedPlayerId = this.activeAt = 3;
    console.log(`activeAt: ${this.activeAt}`);
    console.log(`lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}`);
    if ((this.activeAt + 1) % 4 > 0) {
      this.autoPlay(3 - this.activeAt, 2000);
    }
  }

  isActive(i) {
    if(this.turn===0) return i === (this.activeAt + 1) % 4;
    return i === this.activeAt;
  }

  
  
  autoPlay(n, period, cards=undefined) {
    if (n < 0) return;
    setTimeout(() => {
      console.log(`autoPlay activeAt: ${this.activeAt}`)
      this.activeAt += 1;
      this.activeAt %= 4;
      this.turn += 1;
      console.log(this.activeAt);
      // activePlayer is cards of activePlayer has
      const activePlayer = this.players[this.activeAt];

      if (activePlayer.length && this.activeAt > 0) {
        if(this.lastSubmittedPlayerId === this.activeAt){
          cards = computerSubmits(this.players, this.activeAt,[]); //????
        }
        else {
          cards = computerSubmits(this.players, this.activeAt,this.submittedCardIds, true);
        }
        
        if(cards && cards.length>0) {
          this.submittedCardIds = cards;
          this.lastSubmittedPlayerId = this.activeAt;
          this.players[this.activeAt] = this.players[this.activeAt].filter((each) => !this.submittedCardIds.includes(each));
        }
      }
      this.autoPlay(n-1, 2000, cards);
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
    if (this.turn === 0) this.lastSubmittedPlayerId = this.activeAt = 0;
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
    this.autoPlay(3, 2000);

  }

  clickPassHandler(){
    this.autoPlay(3, 0);
  }
  






}

