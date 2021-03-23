import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsListItemComponent } from './groups-list-item.component';

describe('GroupsListItemComponent', () => {
  let component: GroupsListItemComponent;
  let fixture: ComponentFixture<GroupsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
