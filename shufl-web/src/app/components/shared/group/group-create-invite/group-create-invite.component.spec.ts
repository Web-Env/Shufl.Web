import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreateInviteComponent } from './group-create-invite.component';

describe('GroupCreateInviteComponent', () => {
  let component: GroupCreateInviteComponent;
  let fixture: ComponentFixture<GroupCreateInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupCreateInviteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCreateInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
