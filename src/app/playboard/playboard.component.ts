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


  title = 'big2';
  players = [[], [], [], []];
  activeAt = 0;
  isValidStatus : boolean = false;
  submittedCardIds=[];
  selectedCardIds = [];
  isPlayCards: boolean;
  lastSubmittedPlayerId;
  turn = 0;
  endGame : boolean = false;
  zoom: boolean;
  pass:boolean[]=[false, false, false,false];

  private sub: any;
  isCom: boolean = true;




  constructor(private route: ActivatedRoute, private fireDatabase: AngularFireDatabase) {
  	this.reset();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.isCom = params.isCom === "true";
    });
  }

  reset(){
    this.players = [[], [], [], []];
    this.activeAt = 0;
    this.isValidStatus = false;
    this.submittedCardIds = [];
    this.selectedCardIds = [];
    this.turn = 0;
    this.endGame = false;
    this.pass=[false, false, false,false];

    gameStart(51,this.players);
    for(let i=0; i<4; i++){
      if(this.players[i].includes(0)){
        this.lastSubmittedPlayerId = this.activeAt = (i + 3) % 4;       
      }
    }
    // this.lastSubmittedPlayerId = this.activeAt = 3;
    console.log(`activeAt: ${this.activeAt}`);
    console.log(`lastSubmittedPlayerId: ${this.lastSubmittedPlayerId}`);
    if ((this.activeAt + 1) % 4 > 0) {
      this.zoom = true;
      this.autoPlay(3 - this.activeAt, 1000);
    }
  }

  isActive(i) {
    if(this.turn===0) return i === (this.activeAt + 1) % 4;
    return i === this.activeAt;
  }

  
  
  autoPlay(n, period, cards=undefined) {
    if (n < 0) {
      this.zoom = false;
      return;
    }
    setTimeout(() => {
      console.log(`autoPlay activeAt: ${this.activeAt}`)

      this.activeAt += 1;
      this.activeAt %= 4;
      this.turn += 1;
      this.pass[this.activeAt] = false;
      console.log(this.activeAt);
      // activePlayer is cards of activePlayer has
      const activePlayer = this.players[this.activeAt];
      if (activePlayer.length && this.activeAt > 0) {
        if(this.lastSubmittedPlayerId === this.activeAt){
          cards = computerSubmits(this.players, this.activeAt,[]); 
        }
        else {
          cards = computerSubmits(this.players, this.activeAt,this.submittedCardIds, true);
        }
        if(!cards || !cards.length) this.pass[this.activeAt]=true;
        if(cards && cards.length>0) {
          this.submittedCardIds = cards;
          this.lastSubmittedPlayerId = this.activeAt;
          this.players[this.activeAt] = this.players[this.activeAt].filter((each) => !this.submittedCardIds.includes(each));
        }
      }
      if(!this.players[this.activeAt].length) {
        this.runEndGame();
      } else {
        this.autoPlay(n-1, 500, cards);
      }
    }, period)
  }
  

  getPlayerSelectedCards(selectedCardIds) {
    this.selectedCardIds = selectedCardIds;
    if(this.lastSubmittedPlayerId === 0){
        this.isValidStatus = isValid(selectedCardIds, []);
    }else{
        this.isValidStatus = isValid(selectedCardIds, this.submittedCardIds);
    }
    
  }

  clickSubmitHandler(){
    console.log(`isCom: ${this.isCom}`);
    if (this.isCom) {
      this.pass[this.activeAt] = false;
      this.zoom = true;
      if (this.turn === 0) this.lastSubmittedPlayerId = this.activeAt = 0;
      this.isValidStatus = false;
    	this.isPlayCards = !this.isPlayCards; 
       //what this means?
      if(this.lastSubmittedPlayerId === 0){
          isValid(this.selectedCardIds, [])
      }else{
          isValid(this.selectedCardIds, this.submittedCardIds)
      }
      this.selectedCardIds.sort((a,b) => a - b);
      this.submittedCardIds = this.selectedCardIds;
      this.lastSubmittedPlayerId = 0;
      this.players[0] = this.players[0].filter((each) => !this.submittedCardIds.includes(each));
      if(!this.players[this.activeAt].length) {
        this.runEndGame();
      } else {
        this.autoPlay(3, 500);
      }
    } else {
    }
  }

  clickPassHandler(){
    if (this.isCom) {
      this.zoom = true;
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
  

  runEndGame(){
    this.endGame = true;

  }



}
