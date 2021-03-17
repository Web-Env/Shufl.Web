import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineArtistsTickerComponent } from './inline-artists-ticker.component';

describe('InlineArtistsTickerComponent', () => {
  let component: InlineArtistsTickerComponent;
  let fixture: ComponentFixture<InlineArtistsTickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineArtistsTickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineArtistsTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
