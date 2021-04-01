import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackSearchResultsContainerComponent } from './track-search-results-container.component';

describe('TrackSearchResultsContainerComponent', () => {
  let component: TrackSearchResultsContainerComponent;
  let fixture: ComponentFixture<TrackSearchResultsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackSearchResultsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackSearchResultsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
