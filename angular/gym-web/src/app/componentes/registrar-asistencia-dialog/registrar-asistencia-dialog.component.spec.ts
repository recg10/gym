import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAsistenciaDialogComponent } from './registrar-asistencia-dialog.component';

describe('RegistrarAsistenciaDialogComponent', () => {
  let component: RegistrarAsistenciaDialogComponent;
  let fixture: ComponentFixture<RegistrarAsistenciaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarAsistenciaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarAsistenciaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
