import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaInformeComponent } from './asistencia-informe.component';

describe('AsistenciaInformeComponent', () => {
  let component: AsistenciaInformeComponent;
  let fixture: ComponentFixture<AsistenciaInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsistenciaInformeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
