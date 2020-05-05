
export const isValid = (array,prev) => {
	//sort array
	array = array.sort((a,b) => a - b);
	//invalidate when number of cards is not valid
    if(![1,2,5].includes(array.length)) return false;
    if(prev.length ===1 && [1].includes(array.length)){
    	if (array[0]/4 > prev/4){
				return true;
		}
		else if(array[0]/4 === prev/4){
				if(array[0]%4 > prev%4){
					return true;
				}
		}
		else return false;
    }
    //pair case
    if([2].includes(array.length) && Math.floor(array[0]/ 4)!== Math.floor(array[1]/4)) return false;
    
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



