import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondFourthRowComponent } from './second-fourth-row.component';

describe('SecondFourthRowComponent', () => {
  let component: SecondFourthRowComponent;
  let fixture: ComponentFixture<SecondFourthRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondFourthRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondFourthRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
