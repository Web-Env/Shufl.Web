import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemUserRatingComponent } from './group-item-user-rating.component';

describe('GroupItemUserRatingComponent', () => {
  let component: GroupItemUserRatingComponent;
  let fixture: ComponentFixture<GroupItemUserRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupItemUserRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemUserRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
