import { CardComponent } from './../card/card.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { getCardById } from '../cards';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

	@Input() cardIds: number[] = [];
	@Input() top: boolean = false;
	@Input() left: boolean = false;
	@Input() right: boolean = false;
	@Input() player: boolean = false;
	@Output() change = new EventEmitter();
	selecteds: boolean[] = [];


	getCards(){
		const cards = [];
		for(let i of this.cardIds) {
			cards.push(getCardById(Number(i)));
		}
		return cards;
	}

	selectCard(cardData) {
		console.log(cardData);
		const selectedIndex = this.getCards().findIndex(function(card) {
			return card.suit === cardData.suit && card.value === cardData.value;
		});
		this.selecteds[selectedIndex] = !this.selecteds[selectedIndex];
		
		const selectedCardIds = [];
		for(const i in this.cardIds) {
			if (this.selecteds[i]) selectedCardIds.push(this.cardIds[i]);
		}
		this.change.emit(selectedCardIds);
		console.log(this.selecteds);
	}

}
