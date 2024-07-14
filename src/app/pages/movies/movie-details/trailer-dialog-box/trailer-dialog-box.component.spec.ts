import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerDialogBoxComponent } from './trailer-dialog-box.component';

describe('TrailerDialogBoxComponent', () => {
  let component: TrailerDialogBoxComponent;
  let fixture: ComponentFixture<TrailerDialogBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrailerDialogBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailerDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
