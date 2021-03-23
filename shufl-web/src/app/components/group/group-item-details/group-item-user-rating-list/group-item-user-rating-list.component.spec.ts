import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemUserRatingListComponent } from './group-item-user-rating-list.component';

describe('GroupItemUserRatingListComponent', () => {
  let component: GroupItemUserRatingListComponent;
  let fixture: ComponentFixture<GroupItemUserRatingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupItemUserRatingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemUserRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
