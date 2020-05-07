

//determine card(s) to play at computer player's turns
export const computerSubmits=(players, id, lastSubmittedCardIds)=>{
	if(!lastSubmittedCardIds.length) return [players[id].shift()];
	
	if(lastSubmittedCardIds.length === 1){
		for(let i = 0 ; i <players[id].length;i++){
			if (players[id][i]/4 > lastSubmittedCardIds[0]/4){
				return [players[id][i]];
			}
			else if(players[id][i]/4 === lastSubmittedCardIds[0]/4){
				if(players[id][i]%4 > lastSubmittedCardIds[0]%4){
					return [players[id][i]];
				}
			}	
		}	
	}
	
	if(lastSubmittedCardIds.length === 2){
		const values = {};
		const counts = {};
		const lastSubmittedCardValue = Math.floor(lastSubmittedCardIds[0] / 4);
		for (let cardId of players[id]) {
			const value = Math.floor(cardId / 4);
			if (values[value]) {
				values[value].push(cardId);
				counts[value] += 1;
				if (counts[value] > 1 && value > lastSubmittedCardValue) return values[value];
			} else {
				values[value] = [cardId];
				counts[value] = 1;
			}
		}

	}

	if(lastSubmittedCardIds.length ===5){
		// lastSubmittedCardIds = lastSubmittedCardIds.sort((a,b) => a - b);
		if(isFullHouse(lastSubmittedCardIds)){
			const values = {};
			const counts = {};
			const cardsToSubmit = [];
			const lastSubmittedCardValue = getFullHouseMax(lastSubmittedCardIds);

			for (let cardId of players[id]) {
				const value = Math.floor(cardId / 4);
				if (values[value]) {
					values[value].push(cardId);
					counts[value] += 1; 
				} else {
					values[value] = [cardId];
					counts[value] = 1;
				}
			}

			const valuesArr = Object.values(values) as number[][];

			for (let i =0; i < valuesArr.length; i++){
				if(valuesArr[i].length === 3 && Math.floor(valuesArr[i][0]/4) > lastSubmittedCardValue){
					cardsToSubmit.push(...valuesArr[i]);
					valuesArr.splice(i,1);
					break;
				}
			}
			for (let i =0; i < valuesArr.length; i++){
				if(valuesArr[i].length ===2){
					cardsToSubmit.push(...valuesArr[i]);
					break;
				}
			}
			console.log(cardsToSubmit);
			if(cardsToSubmit.length === 5) return cardsToSubmit;
		}
	}
	return [];
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
		if(Math.floor(array[i]/4) === Math.floor(array[i+1]) && Math.floor(array[i+1]/4) ===Math.floor(array[i+2])/4){
			return Math.floor(array[i]/4);
		}
		else return Math.floor(array[4]/4);
	}

}
