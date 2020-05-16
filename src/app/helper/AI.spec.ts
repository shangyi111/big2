import { isKingKong, getKingKongMax, playKingKong, reactToPairs,reactToSingle,isFullHouse,
		 getFullHouseMax,playFullHouse,isStraight,getStraightMax, findStraight,
		 playStraight, isFlush,findStraightFlush, playStraightFlush } from './AI';

import {Card} from './cards';

describe("Test AI methods", () => {
	it("array is KingKong", () => {
		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(0, 0);
		const result = isKingKong([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});
	it("array is not KingKong", () => {
		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(1, 2);
		const result = isKingKong([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it("find KingKong Max to be 0",()=>{
		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(0, 0);
		const result =getKingKongMax([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual(0);
	})

	it("win KingKong with another Kingkong",()=>{
		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(0, 0);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(3, 0);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);

		const result = playKingKong([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id]);
	})

	it("fail KingKong with another Kingkong",()=>{
		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(0, 0);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(3, 0);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);
		const result = playKingKong([card1.id, card2.id, card3.id, card4.id, card5.id],[pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id]);
		expect(result).toBe(undefined);
	})

	it("beat pairs with the next biggest pairs",()=>{
		const pcard1 = new Card(2, 0);//current player cards
		const pcard2 = new Card(3, 0);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(4, 2);
		const pcard5 = new Card(8, 3);
		const pcard6 = new Card(8, 0);
		const pcard7 = new Card(9, 0);
		const pcard8 = new Card(9, 1);
		const pcard9 = new Card(9, 2);
		const pcard10 = new Card(9, 3);

		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
	
		const result = reactToPairs([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id,pcard6.id, pcard7.id, pcard8.id, pcard9.id, pcard10.id],[card1.id,card2.id]);
		expect(result).toEqual([pcard2.id,pcard3.id]);
	})

	it("fail pairs ",()=>{
		const pcard1 = new Card(2, 0);//current player cards
		const pcard2 = new Card(3, 0);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(4, 2);
		const pcard5 = new Card(8, 3);
		const pcard6 = new Card(8, 0);
		const pcard7 = new Card(9, 0);
		const pcard8 = new Card(9, 1);
		const pcard9 = new Card(9, 2);
		const pcard10 = new Card(9, 3);

		const card1 = new Card(10, 1);
		const card2 = new Card(10, 2);

		const result = reactToPairs([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id,pcard6.id, pcard7.id, pcard8.id, pcard9.id, pcard10.id],[card1.id,card2.id]);
		expect(result).toBe(undefined);
	})

	it("beat single with next biggest single",()=>{
		const pcard1 = new Card(2, 0);//current player cards
		const pcard2 = new Card(3, 0);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(4, 2);
		const pcard5 = new Card(8, 3);
		const pcard6 = new Card(8, 0);
		const pcard7 = new Card(9, 0);
		const pcard8 = new Card(9, 1);
		const pcard9 = new Card(9, 2);
		const pcard10 = new Card(9, 3);

		const card1 = new Card(1, 1);
	
		const result = reactToSingle([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id,pcard6.id, pcard7.id, pcard8.id, pcard9.id, pcard10.id],[card1.id]);
		expect(result).toEqual([pcard1.id]);
	})

	it("array is FullHouse", () => {
		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(1, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(0, 0);

		const result = isFullHouse([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});
	it("array is not FullHouse", () => {

		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(0, 0);

		const result = isFullHouse([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	
	it("array's FullHousemax is 0", () => {

		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(1, 3);

		const result = getFullHouseMax([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual(0);
	});

	it("array's FullHousemax is 3", () => {

		const card1 = new Card(3, 1);
		const card2 = new Card(3, 2);
		const card3 = new Card(3, 3);
		const card4 = new Card(2, 0);
		const card5 = new Card(2, 3);

		const result = getFullHouseMax([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual(3);
	});



	it("win FullHouse with another FullHouse",()=>{
		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(1, 1);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(2, 3);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);

		const result = playFullHouse([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id]);
	})

	it("fail FullHouse with another FullHouse",()=>{
		const card1 = new Card(10, 1);
		const card2 = new Card(10, 2);
		const card3 = new Card(10, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(1, 1);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(2, 3);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);

		const result = playFullHouse([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBe(undefined);
	})

	it("array is not Straight", () => {

		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(0, 0);

		const result = isStraight([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it("array is Straight", () => {

		const card1 = new Card(0, 1);
		const card2 = new Card(1, 2);
		const card3 = new Card(2, 3);
		const card4 = new Card(3, 0);
		const card5 = new Card(4, 0);

		const result = isStraight([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it("0 1 2 11 12 is Straight", () => {

		const card1 = new Card(11, 1);
		const card2 = new Card(12, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(2, 0);

		const result = isStraight([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it("0,1,2,3,12 is Straight", () => {

		const card1 = new Card(3, 1);
		const card2 = new Card(12, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(2, 0);

		const result = isStraight([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it("0,1,10,11,12 is Straight", () => {

		const card1 = new Card(11, 1);
		const card2 = new Card(12, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(1, 0);
		const card5 = new Card(10, 0);

		const result = isStraight([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it("0,9,10,11,12 is Straight", () => {

		const card1 = new Card(11, 1);
		const card2 = new Card(12, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(9, 0);
		const card5 = new Card(10, 0);

		const result = isStraight([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it("0,9,10,11,4 is not Straight", () => {

		const card1 = new Card(11, 1);
		const card2 = new Card(4, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(9, 0);
		const card5 = new Card(10, 0);

		const result = isStraight([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it("0,9,10,11,12 is Straight has Straight Max = (12*4+2)", () => {

		const card1 = new Card(11, 1);
		const card2 = new Card(12, 2);
		const card3 = new Card(0, 3);
		const card4 = new Card(9, 0);
		const card5 = new Card(10, 0);

		const result = getStraightMax([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual((12*4+2));
	});

	it("0,9,10,11,12 is Straight has Straight Max = 36", () => {

		const card1 = new Card(5, 1);
		const card2 = new Card(6, 2);
		const card3 = new Card(7, 3);
		const card4 = new Card(8, 0);
		const card5 = new Card(9, 0);

		const result = getStraightMax([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual(36);
	});

	it ("find Straight", () => {
		const card1 = new Card(5, 1);
		const card2 = new Card(6, 2);
		const card3 = new Card(7, 3);
		const card4 = new Card(8, 0);
		const card5 = new Card(9, 0);
		const result = findStraight([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual([[card1.id, card2.id, card3.id, card4.id, card5.id]]);
	});

	it ("find Straight", () => {
		const card1 = new Card(5, 1);
		const card2 = new Card(6, 2);
		const card3 = new Card(7, 3);
		const card4 = new Card(8, 0);
		const card5 = new Card(9, 0);
		const card6 = new Card(10, 0);
		const result = findStraight([card1.id, card2.id, card3.id, card4.id, card5.id, card6.id]);
		expect(result).toEqual([[card1.id, card2.id, card3.id, card4.id, card5.id], 
			[card2.id, card3.id, card4.id, card5.id, card6.id]]);
	});

	it ("find Straight, not found", () => {
		const card1 = new Card(5, 1);
		const card2 = new Card(6, 2);
		const card3 = new Card(8, 3);
		const card4 = new Card(9, 0);
		const card5 = new Card(10, 0);
		const card6 = new Card(11, 0);
		const result = findStraight([card1.id, card2.id, card3.id, card4.id, card5.id, card6.id]);
		expect(result).toEqual([]);
	});


	it ("find Straight, edge case", () => {
		const card1 = new Card(0, 0);
		const card2 = new Card(1, 0);
		const card3 = new Card(2, 0);
		const card4 = new Card(10, 1);
		const card5 = new Card(11, 2);
		const card6 = new Card(12, 3);
		
		const result = findStraight([card1.id, card2.id, card3.id, card4.id, card5.id, card6.id]);
		console.log(result);
		expect(result).toEqual([[card1.id, card2.id, card4.id, card5.id, card6.id], 
			[card1.id, card2.id, card3.id, card5.id, card6.id]]);
	});

	it ("find Straight, edge case", () => {
		const card1 = new Card(0, 0);
		const card2 = new Card(0, 1);
		const card3 = new Card(1, 0);
		const card4 = new Card(10, 1);
		const card5 = new Card(11, 2);
		const card6 = new Card(12, 3);
		
		const result = findStraight([card1.id, card2.id, card3.id, card4.id, card5.id, card6.id]);
		expect(result).toEqual([[card1.id, card3.id, card4.id, card5.id, card6.id]]);
	});

	it ("play Straight with straight", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 2);
		const card3 = new Card(12, 2);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(0, 2);//current player card
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(10, 0);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 3);
	

		const result = playStraight([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toEqual([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id]);
	});

	it ("fail Straight with straight", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 2);
		const card3 = new Card(12, 2);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(0, 2);//current player card
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(10, 0);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 0);
	

		const result = playStraight([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBe(undefined);
	});

	it ("win Straight with straight from 7 cards", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 2);
		const card3 = new Card(12, 2);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(0, 2);//current player card
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(10, 0);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 3);
		const pcard6 = new Card(3, 3);
		const pcard7 = new Card(4, 0);
	

		const result = playStraight([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id, pcard6.id,pcard7.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		console.log(result);
		expect(result).toEqual([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id]);
	});

	it ("is Flush", () => {
		const card1 = new Card(0, 0);
		const card2 = new Card(2, 0);
		const card3 = new Card(1, 0);
		const card4 = new Card(10, 0);
		const card5 = new Card(11, 0);
		
		const result = isFlush([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("is not Flush", () => {
		const card1 = new Card(0, 0);
		const card2 = new Card(2, 0);
		const card3 = new Card(1, 1);
		const card4 = new Card(10, 0);
		const card5 = new Card(11, 0);
		
		const result = isFlush([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it("Find StraightFlush success", () => {
		const card1 = new Card(1, 0);
		const card2 = new Card(2, 0);
		const card3 = new Card(3, 0);
		const card4 = new Card(4, 0);
		const card5 = new Card(5, 0);
		const card6 = new Card(3, 2);
		const card7 = new Card(4, 3);
		const card8 = new Card(5, 3);

		const result = findStraightFlush([card1.id, card2.id, card3.id, card4.id, card5.id,card6.id, card7.id, card8.id]);
		console.log(result);
		expect(result).toEqual([[card1.id, card2.id, card3.id, card4.id, card5.id]]);
	});


	it("Find StraightFlush success", () => {
		const card1 = new Card(10, 0);
		const card2 = new Card(11, 0);
		const card3 = new Card(12, 0);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);


		const result = findStraightFlush([card1.id, card2.id, card3.id, card4.id, card5.id]);
		console.log(result);
		expect(result).toEqual([[card4.id,card5.id,card1.id, card2.id, card3.id]]);
	});


	it("Find StraightFlush fail", () => {
		const card1 = new Card(1, 0);
		const card2 = new Card(2, 0);
		const card3 = new Card(3, 0);
		const card4 = new Card(4, 3);
		const card5 = new Card(5, 0);
		const card6 = new Card(3, 2);
		const card7 = new Card(4, 3);
		const card8 = new Card(5, 3);

		const result = findStraightFlush([card1.id, card2.id, card3.id, card4.id, card5.id,card6.id, card7.id, card8.id]);
		console.log(result);
		expect(result).toEqual([]);
	});

	it ("win StraightFlush with StraightFlush", () => {
		const card1 = new Card(10, 0);
		const card2 = new Card(11, 0);
		const card3 = new Card(12, 0);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(0, 3);
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(10, 3);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 3);

		const result = playStraightFlush([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		console.log(result);
		expect(result).toEqual([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id]);
	});

	it ("win StraightFlush with StraightFlush same suit", () => {
		const card1 = new Card(4, 0);
		const card2 = new Card(5, 0);
		const card3 = new Card(6, 0);
		const card4 = new Card(7, 0);
		const card5 = new Card(8, 0);

		const pcard1 = new Card(0, 0);
		const pcard2 = new Card(1, 0);
		const pcard3 = new Card(10, 0);
		const pcard4 = new Card(11, 0);
		const pcard5 = new Card(12, 0);

		const result = playStraightFlush([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		console.log(result);
		expect(result).toEqual([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id]);
	});

	it ("fail StraightFlush with StraightFlush ", () => {
		const card1 = new Card(4, 3);
		const card2 = new Card(5, 3);
		const card3 = new Card(6, 3);
		const card4 = new Card(7, 3);
		const card5 = new Card(8, 3);

		const pcard1 = new Card(4, 0);
		const pcard2 = new Card(5, 0);
		const pcard3 = new Card(6, 0);
		const pcard4 = new Card(7, 0);
		const pcard5 = new Card(8, 0);

		const result = playStraightFlush([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		console.log(result);
		expect(result).toBe(undefined);
	});


	



















	
})