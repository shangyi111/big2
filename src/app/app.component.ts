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
  submittedCardIds=[];
  playCards: boolean;

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
  	
  	for(let i=0; i<13; i++){
  		this.players[2].push(newArray[i]);
  	}
  	this.players[2] = this.players[2].sort((a,b) => a - b);
  	
  	for(let i=13; i<26; i++){
  		this.players[1].push(newArray[i]);
  	}
  	this.players[1] = this.players[1].sort((a,b) => a - b);

  	for(let i=26; i<39; i++){
  		this.players[3].push(newArray[i]);
  	}
  	this.players[3] = this.players[3].sort((a,b) => a - b);

  	for(let i=39; i<52; i++){
  		this.players[0].push(newArray[i]);
  	}
  	this.players[0] = this.players[0].sort((a,b) => a - b);
  }

  clickSubmitHandler(){
  	this.playCards = !this.playCards;  //what this means?
  	this.players[0] = this.players[0].filter((each) => !this.submittedCardIds.includes(each));
  	//players[2]date player cards by taking out submitted cards
  }

  getPlayerSelectedCards(selectedCardIds) {
  	this.submittedCardIds = selectedCardIds;
  }
}

