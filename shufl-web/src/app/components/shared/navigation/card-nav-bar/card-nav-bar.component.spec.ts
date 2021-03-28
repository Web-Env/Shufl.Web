import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNavBarComponent } from './card-nav-bar.component';

describe('CardNavBarComponent', () => {
  let component: CardNavBarComponent;
  let fixture: ComponentFixture<CardNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
