import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatevehiculoComponent } from './createvehiculo.component';

describe('CreatevehiculoComponent', () => {
  let component: CreatevehiculoComponent;
  let fixture: ComponentFixture<CreatevehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatevehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatevehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
