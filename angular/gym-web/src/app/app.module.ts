import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { LoginComponent } from './componentes/login/login.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ArticulosComponent } from './componentes/articulos/articulos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogService } from './servicios/confirm-dialog.service';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './componentes/confirmation-dialog/confirmation-dialog.component';
import { ComboBoxComponent } from './componentes/combo-box/combo-box.component';
import { SortDirective } from './directive/sort.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './componentes/security/auth.guard';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { ProveedorComponent } from './componentes/proveedor/proveedor.component';
import { IngresarVentaComponent } from './componentes/ingresar-venta/ingresar-venta.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { CreditoMesComponent } from './componentes/credito-mes/credito-mes.component';
import { CreditoReportesComponent } from './componentes/credito-reportes/credito-reportes.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ParametroComponent } from './componentes/parametro/parametro.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreditosPendientesClientesComponent } from './componentes/creditos-pendientes-clientes/creditos-pendientes-clientes.component';
import { InformeVentaComponent } from './componentes/informe-venta/informe-venta.component';
import { AsistenciaComponent } from './componentes/asistencia/asistencia.component';
import { RegistrarAsistenciaDialogComponent } from './componentes/registrar-asistencia-dialog/registrar-asistencia-dialog.component';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { PlanComponent } from './componentes/plan/plan.component';
import { MatriculaComponent } from './componentes/matricula/matricula.component';
import { AsistenciaInformeComponent } from './componentes/asistencia-informe/asistencia-informe.component';
import { InformeMatriculaRenovacionesComponent } from './componentes/informe-matricula-renovaciones/informe-matricula-renovaciones.component';
import { MonitorVentaComponent } from './componentes/monitor-venta/monitor-venta.component';
import { GenerarVentaComponent } from './componentes/generar-venta/generar-venta.component';


@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    NoEncontradoComponent,    
    TableroComponent,
    LoginComponent,
    PiePaginaComponent,
    ClientesComponent,
    UsuariosComponent,
    AlumnoComponent,
    ArticulosComponent,
    ConfirmationDialogComponent,    
    ComboBoxComponent,
    SortDirective,
    ProveedorComponent,
    IngresarVentaComponent,
    CreditoMesComponent,
    PlanComponent,
    MatriculaComponent,
    CreditoReportesComponent,
    ParametroComponent,
    CreditosPendientesClientesComponent,
    InformeVentaComponent,
    InformeMatriculaRenovacionesComponent,
    AsistenciaComponent,
    MonitorVentaComponent,
    GenerarVentaComponent,
    RegistrarAsistenciaDialogComponent,
    AsistenciaInformeComponent
  ],
  imports: [     
  
BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  exports:[
    ConfirmationDialogComponent
  ],
  providers: [ConfirmDialogService, AuthGuard ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
