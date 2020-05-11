const shuffle=(array: number[])=>{

  	let currentIndex = array.length;
  	let temporaryValue, randomIndex;

  	// While there remain elements to shuffle...
  	while (0 !== currentIndex) {
  		// Pick a remaining element...
  		randomIndex = Math.floor(Math.random() * currentIndex);
  		currentIndex -= 1;

  		// And swap it with the current element.
  		temporaryValue = array[currentIndex];
  		array[currentIndex] = array[randomIndex];
  		array[randomIndex] = temporaryValue;
  	}
	return array;
}  

export const gameStart=(numberOfCards, players)=>{
	const array = [];
  	for(let i=0; i <= numberOfCards; i++){
  		array.push(i);
  	}

  	const newArray = shuffle(array);
  	
    for(let j=0; j<players.length; j++){
      for(let i=j*13 ; i <((j+1)*13); i++){
        players[j].push(newArray[i]);
      }
      players[j]=players[j].sort((a,b) => a - b);
    }  
}