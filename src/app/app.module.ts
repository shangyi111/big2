import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { EndGameComponent } from './end-game/end-game.component';
import { HomeComponent } from './home/home.component';
import { PlayboardComponent } from './playboard/playboard.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardsComponent,
    EndGameComponent,
    HomeComponent,
    PlayboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'playboard/:isCom', component: PlayboardComponent},
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
