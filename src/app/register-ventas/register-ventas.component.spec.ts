import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVentasComponent } from './register-ventas.component';

describe('RegisterVentasComponent', () => {
  let component: RegisterVentasComponent;
  let fixture: ComponentFixture<RegisterVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
