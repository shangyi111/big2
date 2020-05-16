import { isKingKong,getKingKongMax,isFullHouse,
		 getFullHouseMax,isStraight,isFlush, 
		 isStraightFlush, compareStraightFlush, 
		 isValid,getStraightMax} from './rules';

import {Card} from './card';


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

	it("is Straight Flush", () => {

		const card1 = new Card(1, 0);
		const card2 = new Card(2, 0);
		const card3 = new Card(3, 0);
		const card4 = new Card(4, 0);
		const card5 = new Card(5, 0);

		const result = isStraightFlush([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it("is not Straight Flush", () => {

		const card1 = new Card(1, 0);
		const card2 = new Card(2, 0);
		const card3 = new Card(3, 3);
		const card4 = new Card(4, 0);
		const card5 = new Card(5, 0);

		const result = isStraightFlush([card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it ("compareStraightFlush success", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 1);
		const card3 = new Card(12, 1);
		const card4 = new Card(0, 1);
		const card5 = new Card(1, 1);

		const pcard1 = new Card(0, 2);//current player card
		const pcard2 = new Card(1, 2);
		const pcard3 = new Card(10, 2);
		const pcard4 = new Card(11, 2);
		const pcard5 = new Card(12, 2);

		const result = compareStraightFlush([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});


	it ("compareStraightFlush fail", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 1);
		const card3 = new Card(12, 1);
		const card4 = new Card(0, 1);
		const card5 = new Card(1, 1);

		const pcard1 = new Card(0, 0);//current player card
		const pcard2 = new Card(1, 0);
		const pcard3 = new Card(10, 0);
		const pcard4 = new Card(11, 0);
		const pcard5 = new Card(12, 0);

		const result = compareStraightFlush([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it ("compareStraightFlush fail", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 1);
		const card3 = new Card(12, 1);
		const card4 = new Card(0, 1);
		const card5 = new Card(1, 1);

		const pcard1 = new Card(0, 1);//current player card
		const pcard2 = new Card(1, 1);
		const pcard3 = new Card(2, 1);
		const pcard4 = new Card(11, 1);
		const pcard5 = new Card(12, 1);

		const result = compareStraightFlush([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it ("compareStraightFlush success again", () => {
		const card1 = new Card(10, 0);
		const card2 = new Card(11, 0);
		const card3 = new Card(12, 0);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(0, 3);//player cards
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(10, 3);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 3);

		const result = compareStraightFlush([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("beat single", () => {
		const card1 = new Card(10, 1);

		const pcard1 = new Card(12, 1);

		const result = isValid([pcard1.id],[card1.id]);
		expect(result).toBeTruthy();
	});
	it ("fail single", () => {
		const card1 = new Card(10, 1);

		const pcard1 = new Card(10, 0);

		const result = isValid([pcard1.id],[card1.id]);
		expect(result).toBeFalsy();
	});
	it ("beat pairs", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(10, 0);		

		const pcard1 = new Card(12, 1);
		const pcard2 = new Card(12, 3);

		const result = isValid([pcard1.id,pcard2.id],[card1.id,card2.id]);
		expect(result).toBeTruthy();
	});
	it ("fail pairs", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(10, 3);		

		const pcard1 = new Card(10, 0);
		const pcard2 = new Card(10, 2);

		const result = isValid([pcard1.id,pcard2.id],[card1.id,card2.id]);
		expect(result).toBeFalsy();
	});

	it ("beat Straight with StraightFlush", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 2);
		const card3 = new Card(12, 2);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(0, 3);//current player card
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(10, 3);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 3);
	

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});
	it ("beat Fullhouse with StraightFlush", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(10, 2);
		const card3 = new Card(10, 0);
		const card4 = new Card(0, 0);
		const card5 = new Card(0, 2);

		const pcard1 = new Card(0, 3);//current player card
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(10, 3);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 3);
	

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("beat KingKong with StraightFlush", () => {
		const card1 = new Card(10, 0);
		const card2 = new Card(10, 1);
		const card3 = new Card(10, 2);
		const card4 = new Card(10, 3);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(0, 3);
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(2, 3);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 3);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("beat StraightFlush with StraightFlush", () => {
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

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("beat KingKong with KingKong", () => {
		const card1 = new Card(10, 0);
		const card2 = new Card(10, 1);
		const card3 = new Card(10, 2);
		const card4 = new Card(10, 3);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(11, 0);
		const pcard2 = new Card(11, 1);
		const pcard3 = new Card(11, 2);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 3);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});
	it ("fail KingKong with KingKong", () => {
		const card1 = new Card(10, 0);
		const card2 = new Card(10, 1);
		const card3 = new Card(10, 2);
		const card4 = new Card(10, 3);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(9, 0);
		const pcard2 = new Card(9, 1);
		const pcard3 = new Card(9, 2);
		const pcard4 = new Card(9, 3);
		const pcard5 = new Card(12, 3);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it ("beat Straight with Straight", () => {
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

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("fail Straight with Straight", () => {
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

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	it ("beat Straight with FullHouse", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 2);
		const card3 = new Card(12, 2);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(2, 3);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("beat Straight with KingKong", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(11, 2);
		const card3 = new Card(12, 2);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(3, 0);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("beat Fullhouse with FullHouse", () => {
		const card1 = new Card(0, 1);
		const card2 = new Card(0, 2);
		const card3 = new Card(1, 2);
		const card4 = new Card(0, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(2, 3);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	it ("fail Fullhouse with FullHouse", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(10, 2);
		const card3 = new Card(1, 2);
		const card4 = new Card(10, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(2, 3);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});

	fit ("beat Fullhouse with KingKong", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(10, 2);
		const card3 = new Card(1, 2);
		const card4 = new Card(10, 0);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(2, 0);//current player card
		const pcard2 = new Card(3, 0);
		const pcard3 = new Card(3, 1);
		const pcard4 = new Card(3, 2);
		const pcard5 = new Card(3, 3);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeTruthy();
	});

	fit ("fail Fullhouse with Straight", () => {
		const card1 = new Card(10, 1);
		const card2 = new Card(10, 2);
		const card3 = new Card(1, 2);
		const card4 = new Card(10, 3);
		const card5 = new Card(1, 0);

		const pcard1 = new Card(0, 2);//current player card
		const pcard2 = new Card(1, 3);
		const pcard3 = new Card(10, 0);
		const pcard4 = new Card(11, 3);
		const pcard5 = new Card(12, 0);

		const result = isValid([pcard1.id, pcard2.id, pcard3.id, pcard4.id, pcard5.id],[card1.id, card2.id, card3.id, card4.id, card5.id]);
		expect(result).toBeFalsy();
	});













	

