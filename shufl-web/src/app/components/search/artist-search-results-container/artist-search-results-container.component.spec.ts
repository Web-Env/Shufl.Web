import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchResultsContainerComponent } from './artist-search-results-container.component';

describe('ArtistSearchResultsContainerComponent', () => {
  let component: ArtistSearchResultsContainerComponent;
  let fixture: ComponentFixture<ArtistSearchResultsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSearchResultsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSearchResultsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
