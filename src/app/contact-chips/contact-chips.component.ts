import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'nametag',
  templateUrl: './contact-chips.component.html',
  styleUrls: ['./contact-chips.component.css']
})
export class ContactChipsComponent {
	@Input() playerId:number;


	getPositionClass(){
		return ["nameTagDown","nameTagLeft","nameTagUp","nameTagRight"][this.playerId];
	}

	

}
