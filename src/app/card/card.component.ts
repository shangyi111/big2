import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {
	@Input('value') value: number;
	@Input('suit') suit: number;
	@Input() isPlayer: boolean; 
	@Input() selected: boolean;   //selected cards

	@Output() select = new EventEmitter();

	private static SUIT = ["♦","♣","♥","♠"];
	

	getColor(): string {
		return ((this.suit === 0 || this.suit === 2) ? 'red' : 'black');
	}

	getSuitIcon() {
		return CardComponent.SUIT[this.suit];
	}

	getValueIcon(){
		if(this.value === 0) return "A";
		if(this.value === 10) return "J";
		if(this.value === 11) return "Q";
		if(this.value === 12) return "K";
		else return this.value + 1;
 	}

 	onClick() {
 		if (!this.isPlayer) return;
 		this.select.emit({
 			suit: this.suit,
 			value: this.value,
 		})
 	}
}
