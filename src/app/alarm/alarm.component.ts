import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.css']
})

export class AlarmComponent {
	
	@Input('x') x: number;
	@Input('zoomIn') zoomIn: number;
	constructor(){
		this.x = 5;		
	}
}


