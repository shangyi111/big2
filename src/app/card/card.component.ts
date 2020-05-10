import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {
	@Input('value') value: number;
	@Input('suit') suit: number;
	@Input() isUser: boolean; 
	@Input() selected: boolean;   //selected cards
	@Input() fadeIn: boolean = false;

	@Output() select = new EventEmitter();

	private static SUIT = ["♦","♣","♥","♠"];
	

	getColor(): string {
		return ((this.suit === 0 || this.suit === 2) ? 'red' : 'black');
	}

	getSuitIcon() {
		return CardComponent.SUIT[this.suit];
	}

	getValueIcon(){
		if(this.value === 8) return "J";
		if(this.value === 9) return "Q";
		if(this.value === 10) return "K";
		if(this.value === 11) return "A";
		if(this.value === 12) return "2";
		else return this.value + 3;
 	}

 	onClick() {
 		if (!this.isUser) return;
 		this.select.emit({
 			suit: this.suit,
 			value: this.value,
 		})
 	}
}
