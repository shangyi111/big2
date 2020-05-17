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
  autoPlayPromise: any;


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
    if ((this.activeAt + 1) % 4 > 0) {
      // this.zoom = true;
      this.autoPlayPromise = new Promise((resolve, reject) => {
        this.autoPlay(3 - this.activeAt, PlayboardComponent.TIMEOUT);
      });
    }
  }

  isActive(i) {
    if(this.turn===0) return i === (this.activeAt + 1) % 4;
    return i === this.activeAt;
  }

  localComputerSubmits(a, b, c) {
    return computerSubmits(a, b, c);
  }

  
  
  autoPlay(n, period) {
    if (n < 0) return;
    new Promise((resolve, reject) => {
      setTimeout(() => {
        this.activeAt += 1;
        this.activeAt %= 4;
        this.turn += 1;
        this.pass[this.activeAt] = false;
        const activePlayer = this.players[this.activeAt];
        if (activePlayer.length && this.activeAt > 0) {
          if(this.lastSubmittedPlayerId === this.activeAt) this.submittedCardIds = [];
          // console.log(this.submittedCardIds);
          // if (this.activeAt === this.lastSubmittedPlayerId && !this.submittedCardIds.length){
          //   console.log('hi');
          // }
          const cards = computerSubmits(activePlayer, this.submittedCardIds, this.turn === 1);
          if(!cards || !cards.length) {
            this.pass[this.activeAt] = true;
          } else {
            this.submittedCardIds = cards;
            this.lastSubmittedPlayerId = this.activeAt;
            this.players[this.activeAt] = activePlayer.filter((item) => !cards.includes(item));
          }
        }
        resolve(n);
      }, period)
    }).then((t: number)=> {
      console.log(`activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}, pass: ${this.pass[this.activeAt]}, t: ${t}`);
      if(!this.isEndGame(this.activeAt)) {
        this.autoPlay(t - 1, PlayboardComponent.TIMEOUT);
      }
    });
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
    if (this.isCom) {
      if (this.turn === 0) this.lastSubmittedPlayerId = this.activeAt = 0;
      this.selectedCardIds.sort((a,b) => a - b);
      this.submittedCardIds = this.selectedCardIds;
      this.pass[this.activeAt] = false;
      this.lastSubmittedPlayerId = 0;
      this.players[0] = this.players[0].filter((each) => !this.submittedCardIds.includes(each));
      console.log(`player, activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}`);
      if(!this.isEndGame(this.activeAt)) {
        this.autoPlayPromise = new Promise((resolve, reject) => {
          this.autoPlay(3, PlayboardComponent.TIMEOUT);
        });
      }
    }
  }

  clickPassHandler(){
    if (this.isCom) {
      
      // console.log(this.activeAt);
      this.pass[this.activeAt] = true;
      console.log(`player, activeAt: ${this.activeAt}, lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}`);
      this.autoPlayPromise = new Promise((resolve, reject) => {
        this.autoPlay(3, PlayboardComponent.TIMEOUT);
      });
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
