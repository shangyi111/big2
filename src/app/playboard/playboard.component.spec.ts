import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayboardComponent } from './playboard.component';

describe('PlayboardComponent', () => {
  let component: PlayboardComponent;
  let fixture: ComponentFixture<PlayboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 


  // fit("checkPassArray", () => {
  //   expect(component.checkPassArray([false, false, false, true])).toEqual(-3);
  // });

});
