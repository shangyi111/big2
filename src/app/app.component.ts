import { Component } from '@angular/core';
import { getCardById } from './cards';
import { isValid } from './rules';
import { oneCard } from './AI';

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
  isPlayCards: boolean;
  prev=[];


  constructor() {
  	this.gameStart();
  }

  shuffle(array: number[]){

  	let currentIndex = array.length;
  	let temporaryValue, randomIndex;

  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {
  		// Pick a remaining element...
  		randomIndex = Math.floor(Math.random() * currentIndex);
  		currentIndex -= 1;

  		// And swap it with the current element.
  		temporaryValue = array[currentIndex];
  		array[currentIndex] = array[randomIndex];
  		array[randomIndex] = temporaryValue;
  	}

  	return array;
  }  


  gameStart(){
  	const numberOfCards = 51;
  	const array=[];
  	for( let i=0; i <= numberOfCards; i++){
  		array.push(i);
  	}

  	const newArray = this.shuffle(array);
  	
    for(let j=0; j<this.players.length; j++){
      for(let i=j*13 ; i <((j+1)*13); i++){
        this.players[j].push(newArray[i]);
      }
      this.players[j]=this.players[j].sort((a,b) => a - b);
    }
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
        this.submittedCardIds = [oneCard(this.players, this.activeAt,this.prev)];
        this.prev = this.submittedCardIds;
      }
      this.autoPlay(n-1, 3000);
    }, period)
  }
  

  getPlayerSelectedCards(selectedCardIds) {
    this.submittedCardIds = selectedCardIds;
    this.isValidStatus = isValid(selectedCardIds,this.prev);
  }

  clickSubmitHandler(){
    this.isValidStatus = false;
  	this.isPlayCards = !this.isPlayCards; 
     //what this means?
  	if(isValid(this.submittedCardIds, this.prev)){
      this.players[0] = this.players[0].filter((each) => !this.submittedCardIds.includes(each));
      this.prev=this.submittedCardIds;
      //players[2] player cards by taking out submitted cards
      this.autoPlay(3, 0);
    } 


  }

  clickPassHandler(){
    this.autoPlay(3,0);
  }
  






}

