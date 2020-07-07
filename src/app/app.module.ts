import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CardsComponent } from './cards/cards.component';
import { EndGameComponent } from './end-game/end-game.component';
import { HomeComponent } from './home/home.component';
import { PlayboardComponent } from './playboard/playboard.component';
import { ContactChipsComponent } from './contact-chips/contact-chips.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoadingComponent } from './loading/loading.component';
import { AlarmComponent } from './alarm/alarm.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardsComponent,
    EndGameComponent,
    HomeComponent,
    PlayboardComponent,
    ContactChipsComponent,
    LoadingComponent,
    AlarmComponent,
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
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
