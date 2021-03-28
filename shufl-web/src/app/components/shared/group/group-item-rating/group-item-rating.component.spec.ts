import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemRatingComponent } from './group-item-rating.component';

describe('GroupItemRatingComponent', () => {
  let component: GroupItemRatingComponent;
  let fixture: ComponentFixture<GroupItemRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupItemRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
