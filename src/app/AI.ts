

//determine card(s) to play at computer player's turns
export const oneCard=(array, x, prev)=>{
	console.log(prev);
	if(prev.length === 1){
		for(let i = 0 ; i <array[x].length;){
			if (array[x][i]/4 > prev/4){
				return array[x][i];
			}
			else if(array[x][i]/4 === prev/4){
				if(array[x][i]%4 > prev%4){
					return array[x][i];
				}
			}	
			i++;
		}
	}

}
