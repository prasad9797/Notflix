import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneThreeRowComponent } from './one-three-row.component';

describe('OneThreeRowComponent', () => {
  let component: OneThreeRowComponent;
  let fixture: ComponentFixture<OneThreeRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneThreeRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneThreeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
