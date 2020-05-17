
export const isValid = (array,prev) => {
	//sort array
	array = array.sort((a,b) => a - b);

	if(!prev.length){

		if(![1,2,5].includes(array.length)) return false;

    	if(array.length === 1) return true;
	    //pair case
	    if(array.length === 2){
			return Math.floor(array[0]/ 4) === Math.floor(array[1]/4);
	    }

	    if(array.length === 5){
			if(isStraight(array)) return true;
			if(isFullHouse(array)) return true;
			if(isKingKong(array)) return true;
	    }
	}
	//invalidate when number of cards is not valid
    if(![1,2,5].includes(array.length)) return false;

    if(prev.length ===1 && [1].includes(array.length)){
    	return (array[0]/4 > prev[0]/4);
    }
    //pair case

    if(prev.length === 2){
    	if(![2].includes(array.length)) return false;
    	if([2].includes(array.length)){
    		const valueIndex0=Math.floor(array[0]/4);
    		const valueIndex1=Math.floor(array[1]/4);
    		const valuePrev  =Math.floor(prev[0]/4);
    		if(valueIndex1!== valueIndex0) return false;
    		if(valueIndex0 === valueIndex1){
    			if(valueIndex0 === valuePrev){
    				let prevMax = Math.max(prev[0]%4, prev[1]%4)
    				let curMax = Math.max(array[0]%4, array[1]%4)
    				return (curMax > prevMax);
    			}
    			return valueIndex0 > valuePrev;
    		}
    	}
    }

    if(prev.length === 5){
    	if(isFullHouse(prev) && isFullHouse(array)){
    		return (getFullHouseMax(array) > getFullHouseMax(prev));
 		}
 		if(isStraightFlush(prev)){
 			if(!isStraightFlush(array)) return false;
 			else return compareStraightFlush(array,prev);
 		}
 		if(isStraight(prev)){
			if(isStraight(array)){
	 			let prevMax, curMax;
	 			prevMax = getStraightMax(prev);
	 			curMax = getStraightMax(array);
	 			if(curMax > prevMax) return true;
	 		}
	 		return (isFullHouse(array) 
	 			|| isKingKong(array) 
	 			|| isStraightFlush(array));
 		}

 		if(isFullHouse(prev)){
 			if(isFullHouse(array)){
 				return getFullHouseMax(array) > getFullHouseMax(prev);
 			}
 			return isKingKong(array) || isStraightFlush(array);
 		}

 		if(isKingKong(prev)){
 			if(isKingKong(array)){
				if(getKingKongMax(array)>getKingKongMax(prev)) return true;
			}		
			else return (isStraightFlush(array));
 		}


    }


}
export const countMap = (currentPlayerCards)=>{
	const counts = {};
	for (let cardId of currentPlayerCards) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
	}
	return counts;
}
export const valueMap=(currentPlayerCards) =>{
	const values = {};
	for (let cardId of currentPlayerCards) {
		const value = Math.floor(cardId / 4);
		values[value] ? values[value].push(cardId) : values[value]=[cardId];
	}
	return values;
}


export const getKingKongMax=(array) =>{
	const counts = {};
	for (let cardId of array) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
		if (counts[value] === 4) return value;
	}
}


export const isKingKong=(array)=>{
	array = array.sort((a,b) => a - b);
	let countMap = {};
	for (const x of array ) { 
				const value = Math.floor(x/4);
				countMap[value] = (countMap[value] || 0)+1; 
	}

	let max = Math.max(...Object.values(countMap) as number[]);

	if(max === 4) return true;
}

export const getFullHouseMax = (array) => {
	array = array.sort((a,b) => a - b);
	if(Math.floor(array[0]/4) === Math.floor(array[1]/4) && Math.floor(array[1]/4) === Math.floor(array[2]/4)){
		return Math.floor(array[0]/4);
	}
	else return Math.floor(array[4]/4);
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

export const isStraight=(array)=>{
	const counts = countMap(array);
	let max = Math.max(...Object.values(counts) as number[]);


	const values = valueMap(array);
	
	let keysArr = Object.keys(values).map(Number);
	keysArr = keysArr.sort((a,b) => a - b);
	if(max>1) return false;

	let variance = keysArr[4]-keysArr[0]; 
	
	if ( variance === 4) return true;

	if( keysArr.every((i) => [0,1,2,11,12].includes(i))
	 || keysArr.every((i) => [0,1,2,3,12].includes(i))
	 || keysArr.every((i) => [0,1,10,11,12].includes(i))  
	 || keysArr.every((i) => [0,9,10,11,12].includes(i)))return true;
	
	else return (max===1 && variance === 4);
}

export const getStraightMax = (array) => {
	array = array.sort((a,b) => a - b);
	return array[4];
}
export const isFlush = (array) =>{
	const cur=Math.floor(array[0]%4);
	for(let i = 1; i <5; i ++){
		if(Math.floor(array[i]%4) !== cur)  return false;
	}
	return true;
}

export const isStraightFlush = (array)=>{
	return(isFlush(array) && isStraight(array));
}

export const compareStraightFlush = (currentPlayerCards,lastSubmittedCardIds)=>{
	lastSubmittedCardIds.sort((a,b)=> a - b);
	let prevMax = lastSubmittedCardIds[4];
	currentPlayerCards.sort((a,b)=> a - b);
	if(Math.floor(currentPlayerCards[4]%4) === Math.floor(prevMax%4)){
		if(currentPlayerCards[4] > prevMax) return true;
	}
	if(Math.floor(currentPlayerCards[4]%4) > Math.floor(prevMax%4)) return true;	
	else return false;
}


