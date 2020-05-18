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
  
  static TIMEOUT = 1500;

  players = [[], [], [], []];
  activeAt = 0;
  submittedCardIds=[];
  selectedCardIds = [];
  lastSubmittedPlayerId;
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
        // console.log(`activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}, pass: ${this.pass[this.activeAt]}`);       
        if(i === 0) return;

        else {
          this.autoPlayFirstTurn(this.activeAt);
        }
      }
    }
  }

  isActive(i) {
    // if(this.turn===0) return i === (this.activeAt + 1) % 4;
    return i === this.activeAt;
  }
  

  autoPlayFirstTurn(activeAt){ 
 
    this.submittedCardIds = [];
    const activePlayer = this.players[activeAt];
    const cards = computerSubmits(activePlayer, this.submittedCardIds, true);
    console.log(`cards:${cards}`);
    this.submittedCardIds = cards;
    this.lastSubmittedPlayerId = activeAt;
    this.players[activeAt] = activePlayer.filter((item) => !cards.includes(item));
    if((3 - activeAt)> 0){
      this.autoPlay(3 - activeAt, PlayboardComponent.TIMEOUT);
    }
  }

  autoPlay(n, period) {
    if (n < 0) return;
    setTimeout(() => {
      this.activeAt += 1;
      this.activeAt %= 4;
      this.pass[this.activeAt] = false;
      const activePlayer = this.players[this.activeAt];
      if (activePlayer.length && this.activeAt > 0) {
        if(this.lastSubmittedPlayerId === this.activeAt) this.submittedCardIds = [];
        console.log(`submitted cards :${this.submittedCardIds}, activeAt :${this.activeAt}, lastSubmittedPlayerId:${this.lastSubmittedPlayerId},n:${n}`);
        const cards = computerSubmits(activePlayer, this.submittedCardIds,false);
        console.log(`cards:${cards}`);
        if(!cards || !cards.length) {
          this.pass[this.activeAt] = true;
        } else {
          this.submittedCardIds = cards;
          this.lastSubmittedPlayerId = this.activeAt;
          this.players[this.activeAt] = activePlayer.filter((item) => !cards.includes(item));
        }
      }
      console.log(`activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}, pass: ${this.pass[this.activeAt]}`);
      if(!this.isEndGame(this.activeAt)) {
        this.autoPlay(n - 1, PlayboardComponent.TIMEOUT);
      }
    }, period)
  }
  

  getPlayerSelectedCards(selectedCardIds) {
    if(selectedCardIds.length){
      this.selectedCardIds = selectedCardIds;
      this.selectedCardIds.sort((a,b) => a - b);
      if(this.lastSubmittedPlayerId === 0){
        this.submittedCardIds = [];
      }
    }
  }

  isValidStatus() {
    if(!this.selectedCardIds) return false;
    return isValid(this.selectedCardIds, this.submittedCardIds);
  }

  clickSubmitHandler(){
    if (this.isCom) {
      this.submittedCardIds = this.selectedCardIds;
      this.pass[this.activeAt] = false;
      this.players[this.activeAt] = this.players[this.activeAt].filter((each) => !this.submittedCardIds.includes(each));
      console.log(`player, activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}, submittedCardIds:${this.submittedCardIds}`);
      this.lastSubmittedPlayerId = 0;
      if(!this.isEndGame(this.activeAt)) {
        this.autoPlay(3, PlayboardComponent.TIMEOUT);
      }
    }
  }

  clickPassHandler(){
    if (this.isCom) {
      // console.log(this.activeAt);
      this.pass[this.activeAt] = true;
      console.log(`player, activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}`);
      this.autoPlay(3, 0);
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
    return this.players[playerId].length === 0;
  }

}
