import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSearchResultsContainerComponent } from './album-search-results-container.component';

describe('AlbumSearchResultsContainerComponent', () => {
  let component: AlbumSearchResultsContainerComponent;
  let fixture: ComponentFixture<AlbumSearchResultsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumSearchResultsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSearchResultsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
