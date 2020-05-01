import { CardComponent } from './../card/card.component';
import { Component, OnInit, Input } from '@angular/core';
import { getCardById } from '../cards';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

	@Input() cardIds: number[] = [];
	@Input() top: boolean = false;
	@Input() left: boolean = false;
	@Input() right: boolean = false;
	@Input() player: boolean = false;
	selecteds: boolean[] = [];


	getCards(){
		const cards = [];
		for(let i of this.cardIds) {
			cards.push(getCardById(Number(i)));
			this.selecteds.push(false);
		}
		return cards;
	}

	clickHandler(event) {
		const rootNode = event.currentTarget;
		const children = rootNode.childNodes;
		let selectedIdx = 0;
		for(const child of children) {
		    if (this.isDescendant(child, event.target)) break;
		    selectedIdx += 1;
		};
		this.selecteds[selectedIdx] = !this.selecteds[selectedIdx];
		console.log(event);
	}

	isDescendant(parent, child) {
     let node = child.parentNode;
     while (node != null) {
         if (node === parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
	}

}
