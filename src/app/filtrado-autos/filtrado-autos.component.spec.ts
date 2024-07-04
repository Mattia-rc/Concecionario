import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltradoAutosComponent } from './filtrado-autos.component';

describe('FiltradoAutosComponent', () => {
  let component: FiltradoAutosComponent;
  let fixture: ComponentFixture<FiltradoAutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltradoAutosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltradoAutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
