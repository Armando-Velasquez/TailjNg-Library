import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailjngComponent } from './tailjng.component';

describe('TailjngComponent', () => {
  let component: TailjngComponent;
  let fixture: ComponentFixture<TailjngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailjngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailjngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
