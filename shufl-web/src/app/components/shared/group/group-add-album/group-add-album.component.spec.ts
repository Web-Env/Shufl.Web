import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAddAlbumComponent } from './group-add-album.component';

describe('GroupAddAlbumComponent', () => {
  let component: GroupAddAlbumComponent;
  let fixture: ComponentFixture<GroupAddAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAddAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAddAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
