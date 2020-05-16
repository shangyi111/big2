
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

export const getCardById = (id: number) => {
	const value = Math.floor(id / 4);
	const suit = id % 4;
	return {
		value,
		suit,
	}
}