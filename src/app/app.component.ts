import { Component } from '@angular/core';
import { getCardById } from './cards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'big2';
  players = [[], [], [], []];
  activeAt = 0;
  submittedCardIds=[];
  isPlayCards: boolean;

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
      this.activeAt += 1
      this.activeAt %= 4
      // activePlayer is cards of activePlayer has
      const activePlayer = this.players[this.activeAt];
      if (activePlayer.length && this.activeAt > 0) {
        const oneCard = this.players[this.activeAt].shift();
        console.log(oneCard);
        this.submittedCardIds = [oneCard];
      }
      this.autoPlay(n-1, 500);
    }, period)
  }
 

  clickSubmitHandler(){
  	this.isPlayCards = !this.isPlayCards;  //what this means?
  	this.players[0] = this.players[0].filter((each) => !this.submittedCardIds.includes(each));
  	//players[2]date player cards by taking out submitted cards
    this.autoPlay(3, 0);
  }

  getPlayerSelectedCards(selectedCardIds) {
  	this.submittedCardIds = selectedCardIds;
  }
}

