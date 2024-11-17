import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLandingPageComponent } from './book-landing-page.component';

describe('BookLandingPageComponent', () => {
  let component: BookLandingPageComponent;
  let fixture: ComponentFixture<BookLandingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookLandingPageComponent]
    });
    fixture = TestBed.createComponent(BookLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
