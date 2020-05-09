
export const isValid = (array,prev) => {
	//sort array
	array = array.sort((a,b) => a - b);

	if(!prev.length){

		if(![1,2,5].includes(array.length)) return false;

    	if([1].includes(array.length)) return true;
	    //pair case
	    if([2].includes(array.length)){
			if(Math.floor(array[0]/ 4)!== Math.floor(array[1]/4)) return false;
			if(Math.floor(array[0]/ 4) === Math.floor(array[1]/4)) return true;
	    }

	    if([5].includes(array.length)){
		    let countMap = {};
		
			for (const x of array ) { 
				const value = Math.floor(x/4);
				countMap[value] = (countMap[value] || 0)+1; 
			}

			let max = Math.max(...Object.values(countMap) as number[]);
			let min = Math.min(...Object.values(countMap) as number[]);
			
			if(max === 1) {
				let variance = Math.floor(array[4]/4)-Math.floor(array[0]/4);
				if(variance === 4) return true;
				else return false;
			} //test if it is a straight
			if(max === 2) return false;
			if(max === 3 && min === 2) return true;
			if(max === 4) return true;
	    }
	    else return true;
	}
	//invalidate when number of cards is not valid
    if(![1,2,5].includes(array.length)) return false;

    if(prev.length ===1 && [1].includes(array.length)){
    	if (array[0]/4 > prev[0]/4) return true;
		else return false;
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
    				if(curMax > prevMax) return true;
    				else return false;
    			}
    			if(valueIndex0 < valuePrev) return false;
    			if(valueIndex0 > valuePrev) return true;
    		}
    	}
    }

    if(prev.length === 5){
    	if(isFullHouse(prev) && isFullHouse(array)){
    		let prevMax, curMax;
    		for(let i = 1 ; i<5; i ++){
    			prevMax = Math.floor(prev[0]/4) > Math.floor(prev[i]/4) ?  Math.floor(prev[0]/4) : Math.floor(prev[i]/4);  
    		}
    		for(let i = 1 ; i<5; i ++){
    			curMax = Math.floor(array[0]/4) > Math.floor(array[i]/4) ?  Math.floor(array[0]/4) : Math.floor(array[i]/4);  
    		}
    		if(curMax > prevMax) return true;
    		else return false;
 		}


 		if(isStraight(prev)){
			if(isStraight(array)){
	 			let prevMax, curMax;
	 			prevMax = prev[0];
	 			curMax = array[0];
	 			if(curMax >= prevMax) return true;
	 		}
	 		if(isFullHouse(array) || isKingKong(array)) return true;
	 		else return false;
 		}

 		if(isFullHouse(prev)){
 			if(isFullHouse(array)){
 				if(getFullHouseMax(array) > getFullHouseMax(prev)) return true;
 			}
 			if(isKingKong(array)) return true;
 			else return false;
 		}

 		if(isKingKong(prev)){
 			if(isKingKong(array)){
 				if(getKingKongMax(array)>getKingKongMax(prev)) return true;
 			}
 			else return false;
 		}

    }


}


const getKingKongMax=(array) =>{
	const counts = {};
	for (let cardId of array) {
		const value = Math.floor(cardId / 4);
		counts[value] = (counts[value] || 0)+ 1; 
		if (counts[value] === 4) return value;
	}
}


const isKingKong=(array)=>{
	array = array.sort((a,b) => a - b);
	let countMap = {};
	for (const x of array ) { 
				const value = Math.floor(x/4);
				countMap[value] = (countMap[value] || 0)+1; 
	}

	let max = Math.max(...Object.values(countMap) as number[]);

	if(max === 4) return true;
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

const isStraight=(array)=>{
	array = array.sort((a,b) => a - b);
	let variance = Math.floor(array[4]/4)-Math.floor(array[0]/4);
	if(variance === 4) return true;
	else return false;
}



