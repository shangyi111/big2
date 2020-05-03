import { Component } from '@angular/core';
import { getCardById } from './cards';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'big2';
  left=[];
  right=[];
  top=[];
  player=[];
  selectedCardIds=[];

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
  		this.top.push(newArray[i]);
  	}
  	this.top.sort((a,b) => a - b);
  	
  	for(let i=13; i<26; i++){
  		this.left.push(newArray[i]);
  	}
  	this.left.sort((a,b) => a - b);

  	for(let i=26; i<39; i++){
  		this.right.push(newArray[i]);
  	}
  	this.right.sort((a,b) => a - b);

  	for(let i=39; i<52; i++){
  		this.player.push(newArray[i]);
  	}
  	this.player.sort((a,b) => a - b);
  }

  getPlayerSelectedCards(selectedCardIds) {
  	this.selectedCardIds = selectedCardIds;
  }

  
}

