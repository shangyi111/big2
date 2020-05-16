import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	queueListener: any;
	roomsListener: any;
	constructor(private fireDatabase: AngularFireDatabase) {
		if (this.queueListener) this.queueListener.unsubscribe();
		if (this.roomsListener) this.roomsListener.unsubscribe();
	}
	matchPlayers(){
		
		if (!window['big2Info']) {
			window['big2Info'] = {};
			window['big2Info']['big2UserId'] = String(Number(new Date()));
		}
		const userId = window['big2Info']['big2UserId'];

		let queueSub;
		let roomSub;
		new Promise((resolve, reject) => {
			queueSub = this.fireDatabase.list('/queue').valueChanges().subscribe(data => {
				resolve(data);
			});
		}).then((queues: any[]) => {
			if (queueSub) queueSub.unsubscribe();
			return new Promise((resolve, reject) => {
				if (queues.length && queues["0"].rooms.length) {
					if (!window['big2Info']['big2RoomId']) {
	    			const listOfRoomIds = queues["0"].rooms;
	    			const roomId = listOfRoomIds.pop();
	    			queues["0"].rooms = listOfRoomIds;
	    			console.log(queues);
	    			roomSub = this.fireDatabase.list(`/rooms`).valueChanges().subscribe((rooms: any) => {
	    				for(let i = 0; i< rooms.length; i++) {
								const room = rooms[i];
								if (room.roomId === roomId && !room.users.includes(userId)) {
									if (queues["0"].rooms.length) {
				    				this.fireDatabase.list('/queue').update('0', queues);
				    			} else {
				    				this.fireDatabase.list('/queue').remove('0');
				    			}
									room.users.push(userId);
									console.log(room);
				  				this.fireDatabase.list('/rooms').update(roomId, room);
				  				window['big2Info']['big2RoomId'] = roomId;
								}
							}
							resolve(rooms);
	    			});
	    		}
				} else {
					const roomId = String(Number(new Date()));
	    		window['big2Info']['big2RoomId'] = roomId;
	    		this.fireDatabase.list('/queue').update("0", {numOfPeople: 0, rooms: [roomId]});
	    		this.fireDatabase.list('/rooms').update(roomId, {
	    			roomId: roomId,
	    			users: [userId],
	    			players: [[], [], [], []],
					  activeAt: 0,
					  submittedCardIds: [],
					  selectedCardIds: [],
					  lastSubmittedPlayerId: 3,
					  turn: 0,
					  pass: [false, false, false,false],
	    		});
	    		resolve([]);
				}
			});
		}).then((rooms: any[]) => {
			if (roomSub) roomSub.unsubscribe();
			console.log(rooms);
		});
	}
}
