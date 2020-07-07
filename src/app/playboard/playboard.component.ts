import { Component, OnInit } from '@angular/core';
import { getCardById } from '../helper/cards';
import { isValid } from '../helper/rules';
import { computerSubmits } from '../helper/AI';
import { gameStart } from '../helper/gameStart';
import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'playboard',
  templateUrl: './playboard.component.html',
  styleUrls: ['./playboard.component.css']
})
export class PlayboardComponent {
  
  static TIMEOUT = 1000;
  static COUNT_DOWN = 10;

  players = [[], [], [], []];
  activeAt = 0;
  submittedCardIds=[];
  selectedCardIds = [];
  lastSubmittedPlayerId;
  pass:boolean[]=[false, false, false,false];
  isCom: boolean = true;
  forceStopAlarm: boolean;
  timeLeft:number;
  zoomIn:boolean = false;
  buttonEnable:boolean = true;

  


  

  constructor(private route: ActivatedRoute, private fireDatabase: AngularFireDatabase) {
  	this.timeLeft = PlayboardComponent.COUNT_DOWN;
    this.reset();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.isCom = params.isCom === "computer";
    });
  }


  reset(){
    this.players = [[], [], [], []];
    this.activeAt = 0;
    this.submittedCardIds = [];
    this.selectedCardIds = [];
    this.pass=[false, false, false,false];

    gameStart(51, this.players);

    for(let i=0; i < 4; i++){
      
      if(this.players[i].includes(0)){
        this.lastSubmittedPlayerId = this.activeAt = i;   
        if(i === 0) {
          this.buttonEnable = true;
          this.countDown(2 * PlayboardComponent.COUNT_DOWN);
        }else {
          this.autoPlayFirstTurn(this.activeAt);
        }
      }
    }
  }

  isActive(i) {
    return i === this.activeAt;
  }
  

  autoPlayFirstTurn(activeAt){ 

    const activePlayer = this.players[activeAt];
    const cards = computerSubmits(activePlayer,[], true);
    
    this.submittedCardIds = cards;
    this.lastSubmittedPlayerId = activeAt;
    this.players[activeAt] = activePlayer.filter((item) => !cards.includes(item));
    
    this.autoPlay(3 - activeAt, PlayboardComponent.TIMEOUT);

  }

  autoPlay(n, period) {
    setTimeout(() => {
      console.log(`n: ${n}`);
      this.forceStopAlarm = this.activeAt === 1;
      if (n < 0) {
        this.buttonEnable = true;
        this.countDown(2 * PlayboardComponent.COUNT_DOWN);
        return;
      }
      this.activeAt += 1;
      this.activeAt %= 4;
      this.timeLeft = PlayboardComponent.COUNT_DOWN;
      this.pass[this.activeAt] = false;
      console.log(`submittedCardIds:${this.submittedCardIds},activeAt:${this.activeAt}`);
      const activePlayer = this.players[this.activeAt];
      
      if (activePlayer.length && this.activeAt > 0) {
        if(this.lastSubmittedPlayerId === this.activeAt) this.submittedCardIds = [];
        // console.log(`submitted cards :${this.submittedCardIds}, activeAt :${this.activeAt}, lastSubmittedPlayerId:${this.lastSubmittedPlayerId},n:${n}`);
        
        const cards = computerSubmits(activePlayer, this.submittedCardIds,false);

        if(!cards || !cards.length) {
          this.pass[this.activeAt] = true;
        } else {
          this.submittedCardIds = cards;
          this.lastSubmittedPlayerId = this.activeAt;
          this.players[this.activeAt] = activePlayer.filter((item) => !cards.includes(item));
        }
      }
      if(!this.isEndGame(this.activeAt)) {
        this.autoPlay(n - 1, PlayboardComponent.TIMEOUT);
      }
    }, period)
  }
  

  getPlayerSelectedCards(selectedCardIds) {
    if(this.activeAt !== 0) return;
    if(selectedCardIds.length){
      this.selectedCardIds = selectedCardIds;
      this.selectedCardIds.sort((a,b) => a - b);
    }
    if(this.lastSubmittedPlayerId === 0){
        this.submittedCardIds = [];
    }
  }

  isValidStatus() {
    if(!this.selectedCardIds) return false;
    return isValid(this.selectedCardIds, this.submittedCardIds);
  }

  clickSubmitHandler(){
    if (!this.buttonEnable) return;
    this.buttonEnable = false;
    if (this.isCom) {
      this.submittedCardIds = this.selectedCardIds;
      this.pass[this.activeAt] = false;
      this.players[this.activeAt] = this.players[this.activeAt].filter((each) => !this.submittedCardIds.includes(each));
      // console.log(`player, activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}, submittedCardIds:${this.submittedCardIds}`);
      this.lastSubmittedPlayerId = this.activeAt;
      if(!this.isEndGame(this.activeAt)) {
        this.autoPlay(3, PlayboardComponent.TIMEOUT);
      }
    }
  }

  clickPassHandler(){
    if (!this.buttonEnable) return;
    this.buttonEnable = false;
    if (this.isCom) {
      // console.log(this.activeAt);
      this.pass[this.activeAt] = true;
      // console.log(`player, activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}`);
      this.autoPlay(3, PlayboardComponent.TIMEOUT);
    } else {
      this.fireDatabase.list('/items').valueChanges().subscribe(
        data => {
          console.log(data);
        }
      );
    }
  }

  isZoom(activeAt,pass){ 
    if(this.activeAt === 0) return false;
    else if(!this.pass[this.activeAt]) return true;
    else return false;
  }

  isEndGame(playerId) {
    return this.players[playerId].length === 0;
  }

  countDown(n){
    console.log(`activeAt: ${this.activeAt}, counting... ${n}`)
    // if(n < 8 && this.activeAt === 0) this.zoomIn = n%2 === 1;
    if (this.activeAt > 0) return false;
    if(n < -2) {
      this.forceUserAction();
      return true;
    }
    this.timeLeft = Math.floor(n/2);
    setTimeout(() => this.countDown(n-1),500);
  }

  forceUserAction(){
    setTimeout(() => {
      if(this.lastSubmittedPlayerId!== 0){
        this.clickPassHandler();
      }
      else {
        this.selectedCardIds = [];
        this.buttonEnable = false;
        this.autoPlayFirstTurn(this.activeAt);
      }
    }, 1000);
  }

}
