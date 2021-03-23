import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemDetailsComponent } from './group-item-details.component';

describe('GroupItemDetailsComponent', () => {
  let component: GroupItemDetailsComponent;
  let fixture: ComponentFixture<GroupItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
