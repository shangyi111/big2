import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {
	@Input('value') value: number;
	@Input('suit') suit: number;
	@Input() cardPlayer: boolean;
	@Input() selected: boolean;

	@Output() select = new EventEmitter();

	private static SUIT = ["♦","♣","♥","♠"];


	

	getColor(): string {
		return ((this.suit === 0 || this.suit === 2) ? 'red' : 'black');
	}

	getSuitIcon() {
		return CardComponent.SUIT[this.suit];
	}

	getValueIcon(){
		if(this.value === 1) return "A";
		if(this.value === 11) return "J";
		if(this.value === 12) return "Q";
		if(this.value === 13) return "K";
		else return this.value;
 	}

 	onClick() {
 		if (!this.cardPlayer) return;
 		this.select.emit({
 			suit: this.suit,
 			value: this.value,
 		})
 	}
}
