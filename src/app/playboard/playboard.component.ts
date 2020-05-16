import { Component, OnInit } from '@angular/core';
import { getCardById } from '../helper/cards';
import { isValid } from '../helper/rules';
import { computerSubmits } from '../helper/AI';
import { gameStart } from '../helper/gameStart';
import { ActivatedRoute } from '@angular/router';


import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'playboard',
  templateUrl: './playboard.component.html',
  styleUrls: ['./playboard.component.css']
})
export class PlayboardComponent {
  
  static TIMEOUT = 500;

  players = [[], [], [], []];
  activeAt = 0;
  submittedCardIds=[];
  selectedCardIds = [];
  lastSubmittedPlayerId;
  turn = 0;
  pass:boolean[]=[false, false, false,false];
  isCom: boolean = true;


  constructor(private route: ActivatedRoute, private fireDatabase: AngularFireDatabase) {
  	this.reset();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.isCom = params.isCom === "computer";
    });
  }

  // checkPasses(passArray){
  //   let sum = 0;
  //   for (let i = 0 ; i < passArray.length; i ++){
  //     if(passArray[i] ===false) sum -=1;
  //   }
  //  return sum;
  // }

  reset(){
    this.players = [[], [], [], []];
    this.activeAt = 0;
    this.submittedCardIds = [];
    this.selectedCardIds = [];
    this.turn = 0;
    this.pass=[false, false, false,false];

    gameStart(51, this.players);
    for(let i=0; i < 4; i++){
      if(this.players[i].includes(0)){
        this.lastSubmittedPlayerId = this.activeAt = (i + 3) % 4;       
      }
    }
    // this.lastSubmittedPlayerId = this.activeAt = 3;
    console.log(`activeAt: ${this.activeAt}`);
    console.log(`lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}`);
    if ((this.activeAt + 1) % 4 > 0) {
      // this.zoom = true;
      this.autoPlay(3 - this.activeAt, PlayboardComponent.TIMEOUT);
    }
  }

  isActive(i) {
    if(this.turn===0) return i === (this.activeAt + 1) % 4;
    return i === this.activeAt;
  }

  
  
  autoPlay(n, period, cards = undefined) {
    if (n < 0) return;
    setTimeout(() => {
      this.activeAt += 1;
      this.activeAt %= 4;
      this.turn += 1;
      this.pass[this.activeAt] = false;
      const activePlayer = this.players[this.activeAt];
      if (activePlayer.length && this.activeAt > 0) {
        if(this.lastSubmittedPlayerId === this.activeAt) this.submittedCardIds = [];
        cards = computerSubmits(activePlayer, this.submittedCardIds, this.turn === 1);
        if(!cards || !cards.length) {
          this.pass[this.activeAt] = true;
        } else {
          this.submittedCardIds = cards;
          this.lastSubmittedPlayerId = this.activeAt;
          this.players[this.activeAt] = activePlayer.filter((item) => !cards.includes(item));
        }
      }
      if(!this.isEndGame(this.activeAt)) {
        this.autoPlay(n - 1, PlayboardComponent.TIMEOUT, cards);
      }
    }, period)
  }
  

  getPlayerSelectedCards(selectedCardIds) {
    if(selectedCardIds.length){
      this.selectedCardIds = selectedCardIds;
      if(this.lastSubmittedPlayerId === 0){
        this.submittedCardIds = [];
      }
    }
  }

  isValidStatus() {
    return isValid(this.selectedCardIds, this.submittedCardIds);
  }

  clickSubmitHandler(){
    console.log(`isCom: ${this.isCom}`);
    if (this.isCom) {
      if (this.turn === 0) this.lastSubmittedPlayerId = this.activeAt = 0;
      this.selectedCardIds.sort((a,b) => a - b);
      this.submittedCardIds = this.selectedCardIds;
      this.pass[this.activeAt] = false;
      this.lastSubmittedPlayerId = 0;
      this.players[0] = this.players[0].filter((each) => !this.submittedCardIds.includes(each));
      if(!this.isEndGame(this.activeAt)) {
        this.autoPlay(3, 500);
      }
    }
  }

  clickPassHandler(){
    if (this.isCom) {
      this.autoPlay(3, 0);
      this.pass[this.activeAt] = true;
    } else {
      this.fireDatabase.list('/items').valueChanges().subscribe(
        data => {
          console.log(data);
        }
      );
    }
  }

  isZoom(activeAt,pass,submittedCardIds){ 
    if(this.activeAt === 0) return false;
    else if(!this.pass[this.activeAt]) return true;
    else return false;
  }

  isEndGame(playerId) {
    console.log(`playerId: ${playerId}`);
    return this.players[playerId].length === 0;
  }
}
