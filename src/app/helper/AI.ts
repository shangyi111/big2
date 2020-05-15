export const computerSubmits =(currentPlayerCards, lastSubmittedCardIds, isFirstTurn=false)=>{
	let output = [];

	if(!lastSubmittedCardIds.length){
		output = playStraight(currentPlayerCards,lastSubmittedCardIds,isFirstTurn) 
		|| playFullHouse(currentPlayerCards,lastSubmittedCardIds,isFirstTurn) 
		|| playKingKong(currentPlayerCards,lastSubmittedCardIds,isFirstTurn) 
		|| reactToPairs(currentPlayerCards,lastSubmittedCardIds,isFirstTurn)
		|| reactToSigle(currentPlayerCards,lastSubmittedCardIds)
	}
	
	if(lastSubmittedCardIds.length === 1) output = reactToSigle(currentPlayerCards,lastSubmittedCardIds);
	
	if(lastSubmittedCardIds.length === 2) output = reactToPairs(currentPlayerCards,lastSubmittedCardIds);

	if(lastSubmittedCardIds.length === 5){
		
		if(isFullHouse(lastSubmittedCardIds)){
			output = playFullHouse(currentPlayerCards,lastSubmittedCardIds)
			|| playKingKong(currentPlayerCards,lastSubmittedCardIds);
		}

		if(isStraight(lastSubmittedCardIds)){
			output = playStraight(currentPlayerCards,lastSubmittedCardIds)
			|| playFullHouse(currentPlayerCards,lastSubmittedCardIds)
			|| playKingKong(currentPlayerCards,lastSubmittedCardIds);
		}

		if(isKingKong(lastSubmittedCardIds)){
			output = playKingKong(currentPlayerCards,lastSubmittedCardIds);
		}
	}
	return output;
}



const valueMap=(currentPlayerCards) =>{
	const values = {};
	for (let cardId of currentPlayerCards) {
		const value = Math.floor(cardId / 4);
		values[value] ? values[value].push(cardId) : values[value]=[cardId];
	}
	return values;
}

const countMap = (currentPlayerCards)=>{
	const counts = {};
	for (let cardId of currentPlayerCards) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
	}
	return counts;
}

const isKingKong=(array)=>{
	const counts = {};
	for (let cardId of array) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
	}
	let max = Math.max(...Object.values(counts) as number[]);
	if(max === 4) return true;
}

const getKingKongMax=(array) =>{
	const counts = {};
	for (let cardId of array) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
		if (counts[value] === 4) return value;
	}
}

const playKingKong=(currentPlayerCards,lastSubmittedCardIds,isFirstTurn=false)=>{
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

const reactToPairs=(currentPlayerCards,lastSubmittedCardIds,isFirstTurn=false)=>{
	const values = valueMap(currentPlayerCards);
	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length) {
		lastSubmittedCardValue = Math.floor(lastSubmittedCardIds[0] / 4);
	}

	const valuesArr = Object.values(values) as number[][];
	const pair = valuesArr.find((cards) => cards.length === 2 && Math.floor(cards[0]/4) > lastSubmittedCardValue);
	return (!isFirstTurn || (pair && pair.includes(0))) ? pair : undefined;
}


const reactToSigle=(currentPlayerCards,lastSubmittedCardIds)=>{
	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length) lastSubmittedCardValue=lastSubmittedCardIds[0]/4;
	for(let i = 0 ; i <currentPlayerCards.length;i++){
		if (currentPlayerCards[i]/4 > lastSubmittedCardValue){
			return [currentPlayerCards[i]];
		}	
	}	
}

const isFullHouse=(array)=>{ //five elements in this array
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

const getFullHouseMax = (array) => {
	array = array.sort((a,b) => a - b);
	for(let i=0; i <5; i ++){
		if(Math.floor(array[i]/4) === Math.floor(array[i+1]/4) && Math.floor(array[i+1]/4) ===Math.floor(array[i+2])/4){
			return Math.floor(array[i]/4);
		}
		else return Math.floor(array[4]/4);
	}

}

const playFullHouse=(currentPlayerCards, lastSubmittedCardIds, isFirstTurn=false)=>{
	const values = valueMap(currentPlayerCards);
	const cardsToSubmit = [];
	let lastSubmittedCardValue = -1;
	if(isStraight(lastSubmittedCardIds) || !lastSubmittedCardIds.length){
		lastSubmittedCardValue = -1;
	} else lastSubmittedCardValue = getFullHouseMax(lastSubmittedCardIds);

	const valuesArr = Object.values(values) as number[][];

	for (let i =0; i < valuesArr.length; i++){
		if(valuesArr[i].length === 3 && Math.floor(valuesArr[i][0]/4) > lastSubmittedCardValue){
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

const isStraight=(array)=>{
	array = array.sort((a,b) => a - b);
	let variance = Math.floor(array[4]/4)-Math.floor(array[0]/4);
	if(variance === 4) return true;
	else return false;
}

const getStraightMax = (array) => {
	array = array.sort((a,b) => a - b);
	return array[4]/4;
}


const findStraight=(array)=>{
	let straightEndsAtIds=[];
	array = array.sort((a,b) => a - b);
	for(let i = 0 ; i <(array.length-4);i++){
		let variance = Math.floor(array[i+4])-Math.floor(array[i]);
		if(variance === 4) straightEndsAtIds.push(i+4);
	}
	return straightEndsAtIds;

}

const playStraight=(currentPlayerCards, lastSubmittedCardIds,isFirstTurn=false)=>{

	const values = valueMap(currentPlayerCards);
	const cardsToSubmit = [];
	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length) {
		lastSubmittedCardValue=getStraightMax(lastSubmittedCardIds);
	}

	const valuesArr = Object.keys(values);

	let straightEndsAtIds = findStraight(valuesArr);
	for(let i = 0; i <straightEndsAtIds.length; i ++ ){
		let curPosition = straightEndsAtIds[i];
		if(Number(valuesArr[straightEndsAtIds[i]]) === Math.floor(lastSubmittedCardValue)){
			for(let j =0; j <values[valuesArr[straightEndsAtIds[i]]].length; j ++){
				if(values[valuesArr[straightEndsAtIds[i]]][j] > lastSubmittedCardValue){
					cardsToSubmit.push(values[valuesArr[curPosition-i]][j])
				}
				for (let k = 1; k < 5; k++) {
					cardsToSubmit.push(values[valuesArr[curPosition-k]][0]);
				}	
				cardsToSubmit.sort((a,b) => a - b);
				return (!isFirstTurn || cardsToSubmit.includes(0)) ? cardsToSubmit : undefined;
			}
		}
		
		if(Number(valuesArr[straightEndsAtIds[i]]) > Math.floor(lastSubmittedCardValue)){
			for (let i = 0; i < 5; i++) {
				cardsToSubmit.push(values[valuesArr[curPosition-i]][0]);
			}
			cardsToSubmit.sort((a,b) => a - b);
			return (!isFirstTurn || cardsToSubmit.includes(0)) ? cardsToSubmit : undefined;
		}
	}
}

