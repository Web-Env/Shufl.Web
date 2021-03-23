import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemListComponent } from './group-item-list.component';

describe('GroupItemListComponent', () => {
  let component: GroupItemListComponent;
  let fixture: ComponentFixture<GroupItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
