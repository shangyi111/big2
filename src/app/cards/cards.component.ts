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
	@Input() isActive: boolean;
	@Input() playerId: number;
	@Output() playerSelectedCards = new EventEmitter();
	selecteds: boolean[] = [];


	getCards(){
		const cards = [];
		for(let i of this.cardIds) {
			cards.push(getCardById(Number(i)));
		}
		if (this.playerId === 0) {
			for (let i in this.selecteds) {
				if(!this.cardIds.includes(Number(i))) this.selecteds[i] = false;
			}
		}
		return cards;
	}

	getPlayerSide() {
		if (this.playerId === 0) {
			return 'downCards';
		}else if (this.playerId === 1) {
			return 'leftCards';
		}else if (this.playerId === 2) {
			return 'topCards';
		}else if (this.playerId === 3) {
			return 'rightCards';
		}
	}

	isSelected(cardData) {
		const cardId = (cardData.value) * 4 + cardData.suit;
		return this.selecteds[cardId];
	}

	generateSelectedCardIds(cardData) {
		const cardId = (cardData.value) * 4 + cardData.suit;
		// set selected cardId to true
		this.selecteds[cardId] = !this.selecteds[cardId];
		
		// push all selected cardId into selectedCardIds
		const selectedCardIds = [];
		for(const i in this.selecteds) {
			if (this.selecteds[i]) selectedCardIds.push(Number(i));
		}
		return selectedCardIds;
	}

	emitSelectedCardIds(cardData){
		// emit selectedCardIds to the center placeholder
		this.playerSelectedCards.emit(this.generateSelectedCardIds(cardData));
	}

	

}
