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
		console.log(this.selecteds);
		if (this.player) {
			for (let i in this.selecteds) {
				console.log(i);
				if(!this.cardIds.includes(Number(i))) this.selecteds[i] = false;
			}
		}
		console.log(this.selecteds);
		return cards;
	}

	// isSelected(i) {
	// 	return this.selecteds[i];
	// }

	isSelected(cardData) {
		const cardId = (cardData.value) * 4 + cardData.suit;
		return this.selecteds[cardId];
	}

	selectCard(cardData) {
		const cardId = (cardData.value) * 4 + cardData.suit;
		this.selecteds[cardId] = !this.selecteds[cardId];
		
		const selectedCardIds = [];
		for(const i in this.selecteds) {
			if (this.selecteds[i]) selectedCardIds.push(Number(i));
		}
		this.change.emit(selectedCardIds);
	}

}
