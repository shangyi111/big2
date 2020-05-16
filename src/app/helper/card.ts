
export class Card {
	id: number;
	value: number;
	suit: number;
	constructor(value: number, suit: number) {
		this.id = value *4 + suit;
	}

	getCardDataObject() {
		return { value: this.value, suit: this.suit };
	}
}