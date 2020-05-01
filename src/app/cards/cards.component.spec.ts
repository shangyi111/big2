import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandsComponent } from './hands.component';

describe('HandsComponent', () => {
  let component: HandsComponent;
  let fixture: ComponentFixture<HandsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
