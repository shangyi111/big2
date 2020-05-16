export const computerSubmits =(currentPlayerCards, lastSubmittedCardIds, isFirstTurn=false)=>{
	let output = [];

	if(!lastSubmittedCardIds.length){
		output = playStraight(currentPlayerCards,lastSubmittedCardIds,isFirstTurn) 
		|| playFullHouse(currentPlayerCards,lastSubmittedCardIds,isFirstTurn) 
		|| playKingKong(currentPlayerCards,lastSubmittedCardIds,isFirstTurn) 
		|| reactToPairs(currentPlayerCards,lastSubmittedCardIds,isFirstTurn)
		|| reactToSingle(currentPlayerCards,lastSubmittedCardIds)
	}
	
	if(lastSubmittedCardIds.length === 1) output = reactToSingle(currentPlayerCards,lastSubmittedCardIds);
	
	if(lastSubmittedCardIds.length === 2) output = reactToPairs(currentPlayerCards,lastSubmittedCardIds);

	if(lastSubmittedCardIds.length === 5){
		
		if(isFullHouse(lastSubmittedCardIds)){
			output = playFullHouse(currentPlayerCards,lastSubmittedCardIds)
			|| playKingKong(currentPlayerCards,lastSubmittedCardIds)
			|| playStraightFlush(currentPlayerCards,lastSubmittedCardIds);
		}

		if(isStraight(lastSubmittedCardIds)){
			output = playStraight(currentPlayerCards,lastSubmittedCardIds)
			|| playFullHouse(currentPlayerCards,lastSubmittedCardIds)
			|| playKingKong(currentPlayerCards,lastSubmittedCardIds)
			|| playStraightFlush(currentPlayerCards,lastSubmittedCardIds);
		}

		if(isKingKong(lastSubmittedCardIds)){
			output = playKingKong(currentPlayerCards,lastSubmittedCardIds)
			|| playStraightFlush(currentPlayerCards,lastSubmittedCardIds);
		}
	}
	return output;
}



export const valueMap=(currentPlayerCards) =>{
	const values = {};
	for (let cardId of currentPlayerCards) {
		const value = Math.floor(cardId / 4);
		values[value] ? values[value].push(cardId) : values[value]=[cardId];
	}
	return values;
}

export const countMap = (currentPlayerCards)=>{
	const counts = {};
	for (let cardId of currentPlayerCards) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
	}
	return counts;
}

export const isKingKong=(array)=>{
	const counts = countMap(array);

	let max = Math.max(...Object.values(counts) as number[]);
	if(max === 4) return true;
}

export const getKingKongMax=(array) =>{
	const counts = {};
	for (let cardId of array) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
		if (counts[value] === 4) return value;
	}
}

export const playKingKong=(currentPlayerCards,lastSubmittedCardIds,isFirstTurn=false)=>{
	const values = valueMap(currentPlayerCards);
	const cardsToSubmit = [];
	let lastSubmittedCardValue = null;

	if(isKingKong(lastSubmittedCardIds)){
		lastSubmittedCardValue = getKingKongMax(lastSubmittedCardIds);
	} else lastSubmittedCardValue = null;

	const valuesArr = Object.values(values) as number[][];

	for (let i =0; i < valuesArr.length; i++){
		if(valuesArr[i].length === 4 && (valuesArr[i][0]/4)>lastSubmittedCardValue){
			cardsToSubmit.push(...valuesArr[i]);
			valuesArr.splice(i,1);
			for (let j =0; j < valuesArr.length; j++){
				if(valuesArr[j].length ===1){
					cardsToSubmit.push(...valuesArr[j]);
					cardsToSubmit.sort((a,b) => a - b);
					return (!isFirstTurn || cardsToSubmit.includes(0)) ? cardsToSubmit : undefined;
				}
			}
		}
	}
}

export const reactToPairs=(currentPlayerCards,lastSubmittedCardIds,isFirstTurn=false)=>{
	const values = valueMap(currentPlayerCards);
	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length) {
		lastSubmittedCardValue = Math.floor(lastSubmittedCardIds[0] / 4);
	}

	const valuesArr = Object.values(values) as number[][];
	const pair = valuesArr.find((cards) => cards.length === 2 && Math.floor(cards[0]/4) > lastSubmittedCardValue);
	return (!isFirstTurn || (pair && pair.includes(0))) ? pair : undefined;
}


export const reactToSingle=(currentPlayerCards,lastSubmittedCardIds)=>{
	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length){
		for(let i = 0 ; i <currentPlayerCards.length;i++){
			if (currentPlayerCards[i] > [lastSubmittedCardValue][0]){
				return [currentPlayerCards[i]];
			}	
		}	
	}
}

export const isFullHouse=(array)=>{ //five elements in this array
	array = array.sort((a,b) => a - b);
	let countMap = {};
	for (const x of array ) { 
				const value = Math.floor(x/4);
				countMap[value] = (countMap[value] || 0)+1; 
	}

	let max = Math.max(...Object.values(countMap) as number[]);
	let min = Math.min(...Object.values(countMap) as number[]);

	if(max === 3 && min == 2) return true;
}

export const getFullHouseMax = (array) => {
	const counts = {};
	for (let cardId of array) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
		if (counts[value] === 3) return value;
	}

}

export const playFullHouse=(currentPlayerCards, lastSubmittedCardIds, isFirstTurn=false)=>{
	const values = valueMap(currentPlayerCards);
	const cardsToSubmit = [];
	let lastSubmittedCardValue = -1;
	if(isStraight(lastSubmittedCardIds) || !lastSubmittedCardIds.length){
		lastSubmittedCardValue = -1;
	} else lastSubmittedCardValue = getFullHouseMax(lastSubmittedCardIds);

	const valuesArr = Object.values(values) as number[][];

	for (let i =0; i < valuesArr.length; i++){
		if(valuesArr[i].length === 3 && (valuesArr[i][0]/4) > lastSubmittedCardValue){
			cardsToSubmit.push(...valuesArr[i]);
			valuesArr.splice(i,1);
			for (let j =0; j < valuesArr.length; j++){
				if(valuesArr[j].length ===2){
					cardsToSubmit.push(...valuesArr[j]);
					cardsToSubmit.sort((a,b) => a - b);
					return (!isFirstTurn || cardsToSubmit.includes(0)) ? cardsToSubmit : undefined;
				}
			}
		}
	}
}

export const isFlush = (array) =>{
	const cur=Math.floor(array[0]%4);
	for(let i = 1; i <5; i ++){
		if(Math.floor(array[i]%4) !== cur)  return false;
	}
	return true;
}


export const isStraight=(array)=>{
	console.log(array);

	const counts = countMap(array);
	let max = Math.max(...Object.values(counts) as number[]);

	const values = valueMap(array);
	let keysArr = Object.keys(values).map(Number);

	keysArr = keysArr.sort((a,b) => a - b);
	console.log(keysArr);
	
	if(max>1) return false;

	let variance = keysArr[4]-keysArr[0]; 
	
	if ( variance === 4) return true;
	return ( keysArr.every((i) => [0,1,2,11,12].includes(i))
	 || keysArr.every((i) => [0,1,2,3,12].includes(i))
	 || keysArr.every((i) => [0,1,10,11,12].includes(i))  
	 || keysArr.every((i) => [0,9,10,11,12].includes(i)));
				  
}

export const getStraightMax = (array) => {
	array = array.sort((a,b) => a - b);
	return array[4];
}


export const findStraight=(cardIds)=>{
	const allStraights = [];
	cardIds = cardIds.sort((a,b) => a - b);
	for (let i = 0; i < cardIds.length; i++) {
		const aStraight = [cardIds[i]];
		let k = i;
		for (let j = 1; j < 5; j++) {
			const len = aStraight.length;
			const lastStraightValue = Math.floor(aStraight[len - 1]/4);
			let nextValue = Math.floor(cardIds[(k+j) % cardIds.length]/4);
			while (lastStraightValue === nextValue) {
				k++;
				nextValue = Math.floor(cardIds[(k+j) % cardIds.length]/4);
			}
			if(lastStraightValue === nextValue - 1 ||
				(lastStraightValue === 12 && nextValue === 0)) {
				aStraight.push(cardIds[(k+j) % cardIds.length]);
			}
		}
		if (aStraight.length === 5) {
			aStraight.sort((a,b) => a - b);
			allStraights.push(aStraight);
		}
	}
	return allStraights;
}

export const findStraightFlush=(cardIds)=>{
	let AllStraightFlush=[];
	let allStraightsArray = findStraight(cardIds);
	if(!allStraightsArray.length) return [];

	for(let i = 0; i < allStraightsArray.length; i ++ ){
		if(isFlush(allStraightsArray[i])) {
			AllStraightFlush.push(allStraightsArray[i]);
		}
	}
	return AllStraightFlush;
}


export const playStraightFlush=(currentPlayerCards,lastSubmittedCardIds)=>{
	const AllStraightFlush = findStraightFlush(currentPlayerCards);
	
	if(!AllStraightFlush || !AllStraightFlush.length) return undefined;
	lastSubmittedCardIds.sort((a,b)=> a - b);
	let prevMax = lastSubmittedCardIds[4];

	if( !(isFlush(lastSubmittedCardIds) && isStraight(lastSubmittedCardIds))) prevMax = -1;

	for(let i = 0; i <AllStraightFlush.length; i ++){
		AllStraightFlush[i].sort((a,b) => a - b);
		if(Math.floor(AllStraightFlush[i][4]%4) === Math.floor(prevMax%4)){
			if(AllStraightFlush[i][4] > prevMax) return AllStraightFlush[i];
		}
		if(Math.floor(AllStraightFlush[i][4]%4) > Math.floor(prevMax%4)) return AllStraightFlush[i];	
	}
}



export const playStraight=(currentPlayerCards, lastSubmittedCardIds,isFirstTurn=false)=>{

	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length) {
		lastSubmittedCardValue=getStraightMax(lastSubmittedCardIds);
	}

	let allStraightsArray = findStraight(currentPlayerCards);
	if(!allStraightsArray.length) return undefined;

	for(let i = 0; i <allStraightsArray.length; i ++ ){
		if(allStraightsArray[i][4] > lastSubmittedCardValue) return allStraightsArray[i];
	}
		
}

