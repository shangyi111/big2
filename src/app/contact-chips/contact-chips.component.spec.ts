import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactChipsComponent } from './contact-chips.component';

describe('ContactChipsComponent', () => {
  let component: ContactChipsComponent;
  let fixture: ComponentFixture<ContactChipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactChipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
