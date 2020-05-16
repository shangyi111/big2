import {getCardById} from './cards'
describe("Test helper methods in Cards", () => {
	it("min id 0 match to value 0 and suit 0", () => {
		const cardObj = getCardById(0);
		expect(cardObj).toEqual({value: 0, suit: 0});
	});
	it("max id 51 match to value 13 and suit 3", () => {
		const cardObj = getCardById(51);
		expect(cardObj).toEqual({value: 12, suit: 3});
	});
})