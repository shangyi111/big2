export const computerSubmits=(players, id, lastSubmittedCardIds, isFirstTurn=false)=>{
	let output = [];
	if(!lastSubmittedCardIds.length){
		output = playStraight(players,id,lastSubmittedCardIds,isFirstTurn) 
			|| playFullHouse(players,id,lastSubmittedCardIds,isFirstTurn) 
			|| playKingKong(players,id,lastSubmittedCardIds,isFirstTurn) 
			|| reactToPairs(players,id,lastSubmittedCardIds,isFirstTurn)
			|| reactToSigle(players,id,lastSubmittedCardIds)
	}
	
	if(lastSubmittedCardIds.length === 1) output = reactToSigle(players,id,lastSubmittedCardIds);
	
	if(lastSubmittedCardIds.length === 2) output = reactToPairs(players,id,lastSubmittedCardIds);

	if(lastSubmittedCardIds.length === 5){
		
		if(isFullHouse(lastSubmittedCardIds)){
			output = playFullHouse(players,id,lastSubmittedCardIds)
					|| playKingKong(players,id,lastSubmittedCardIds);
		}

		if(isStraight(lastSubmittedCardIds)){
			output = playStraight(players,id,lastSubmittedCardIds)
			      || playFullHouse(players,id,lastSubmittedCardIds)
			      || playKingKong(players,id,lastSubmittedCardIds);
		}

		if(isKingKong(lastSubmittedCardIds)){
			output = playKingKong(players,id,lastSubmittedCardIds);
		}
	}
	return output;
}



const valueMap=(players,id) =>{
	const values = {};
	for (let cardId of players[id]) {
		const value = Math.floor(cardId / 4);
		values[value] ? values[value].push(cardId) : values[value]=[cardId];
	}
	return values;
}

const countMap = (players, id)=>{
	const counts = {};
	for (let cardId of players[id]) {
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

const playKingKong=(players,id,lastSubmittedCardIds,isFirstTurn=false)=>{
	const values = valueMap(players,id);
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
					return (!isFirstTurn || cardsToSubmit.includes(0)) ? cardsToSubmit : undefined;
				}
			}
		}
	}
}

const reactToPairs=(players,id,lastSubmittedCardIds,isFirstTurn=false)=>{
	const values = valueMap(players,id);
	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length) {
		lastSubmittedCardValue = Math.floor(lastSubmittedCardIds[0] / 4);
	}

	const valuesArr = Object.values(values) as number[][];
	const pair = valuesArr.find((cards) => cards.length === 2 && Math.floor(cards[0]/4) > lastSubmittedCardValue);
	return (!isFirstTurn || (pair && pair.includes(0))) ? pair : undefined;
}


const reactToSigle=(players,id,lastSubmittedCardIds)=>{
	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length) lastSubmittedCardValue=lastSubmittedCardIds[0]/4;
	for(let i = 0 ; i <players[id].length;i++){
		if (players[id][i]/4 > lastSubmittedCardValue){
			return [players[id][i]];
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

const playFullHouse=(players, id, lastSubmittedCardIds, isFirstTurn=false)=>{
	const values = valueMap(players, id);
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
	return Math.floor(array[0]/4);
}


const findStraight=(array)=>{
	let straightStartsAtIds=[];
	array = array.sort((a,b) => a - b);
	for(let i = 0 ; i <(array.length-4);i++){
		let variance = Math.floor(array[i+4])-Math.floor(array[i]);
		if(variance === 4) straightStartsAtIds.push(i);
	}
	return straightStartsAtIds;

}

const playStraight=(players,id, lastSubmittedCardIds,isFirstTurn=false)=>{

	const values = valueMap(players, id);
	const cardsToSubmit = [];
	let lastSubmittedCardValue = -1;
	if(lastSubmittedCardIds.length) {
		lastSubmittedCardValue=getStraightMax(lastSubmittedCardIds);
	} else lastSubmittedCardValue = -1;

	const valuesArr = Object.keys(values);

	let straightStartsAtIds = findStraight(valuesArr);
	for(let i = 0; i <straightStartsAtIds.length; i ++ ){
		if(Number(valuesArr[straightStartsAtIds[i]]) >= lastSubmittedCardValue){
			let curPosition = straightStartsAtIds[i];
			cardsToSubmit.push(values[valuesArr[curPosition]][0]);
			cardsToSubmit.push(values[valuesArr[curPosition+1]][0]);
			cardsToSubmit.push(values[valuesArr[curPosition+2]][0]);
			cardsToSubmit.push(values[valuesArr[curPosition+3]][0]);
			cardsToSubmit.push(values[valuesArr[curPosition+4]][0]);
			return (!isFirstTurn || cardsToSubmit.includes(0)) ? cardsToSubmit : undefined;
		}
	}
}

