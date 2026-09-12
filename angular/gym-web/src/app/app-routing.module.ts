import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ArticulosComponent } from './componentes/articulos/articulos.component';
import { ProveedorComponent } from './componentes/proveedor/proveedor.component';
import { IngresarVentaComponent } from './componentes/ingresar-venta/ingresar-venta.component';
import { CreditoMesComponent } from './componentes/credito-mes/credito-mes.component';
import { CreditoReportesComponent } from './componentes/credito-reportes/credito-reportes.component';
import { ParametroComponent } from './componentes/parametro/parametro.component';
import { CreditosPendientesClientesComponent } from './componentes/creditos-pendientes-clientes/creditos-pendientes-clientes.component';
import { InformeVentaComponent } from './componentes/informe-venta/informe-venta.component';
import { AsistenciaComponent } from './componentes/asistencia/asistencia.component';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { PlanComponent } from './componentes/plan/plan.component';
import { MatriculaComponent } from './componentes/matricula/matricula.component';
import { AsistenciaInformeComponent } from './componentes/asistencia-informe/asistencia-informe.component';
import { InformeMatriculaRenovacionesComponent } from './componentes/informe-matricula-renovaciones/informe-matricula-renovaciones.component';
import { AuthGuard } from './componentes/security/auth.guard';
import { MonitorVentaComponent } from './componentes/monitor-venta/monitor-venta.component';
import { GenerarVentaComponent } from './componentes/generar-venta/generar-venta.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "usuarios", component: UsuariosComponent, canActivate: [AuthGuard]  },
  { path: "alumnos", component: AlumnoComponent, canActivate: [AuthGuard]  },
  { path: "matriculas", component: MatriculaComponent, canActivate: [AuthGuard]  },
  { path: "planes", component: PlanComponent, canActivate: [AuthGuard]  },
  { path: "proveedores", component: ProveedorComponent, canActivate: [AuthGuard]  },
  { path: "articulos", component: ArticulosComponent, canActivate: [AuthGuard]  },
  { path: "ingresar-venta", component: IngresarVentaComponent, canActivate: [AuthGuard]  },
  { path: "clientes", component: ClientesComponent, canActivate: [AuthGuard]  },
  { path: "InformeCreditoCliente", component: CreditoReportesComponent, canActivate: [AuthGuard]  },
  { path: "informeMatriculaRenovaciones", component: InformeMatriculaRenovacionesComponent, canActivate: [AuthGuard]  },
  { path: "parametros", component: ParametroComponent, canActivate: [AuthGuard]  },
  { path: "listarCredito", component: CreditoMesComponent, canActivate: [AuthGuard]  },
  { path: "informe-venta", component: InformeVentaComponent, canActivate: [AuthGuard]  },
  { path: "creditosPendientesClientes", component: CreditosPendientesClientesComponent, canActivate: [AuthGuard]  },
  { path: "asistencia", component: AsistenciaComponent , canActivate: [AuthGuard]  },
  { path: "monitor-venta", component: MonitorVentaComponent, canActivate: [AuthGuard]  },
  { path: "generar-venta", component: GenerarVentaComponent, canActivate: [AuthGuard]  },
  { path: "asistenciaInforme", component: AsistenciaInformeComponent, canActivate: [AuthGuard]  },
  { path: "**", component: NoEncontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
exports: [RouterModule]
})
export class AppRoutingModule { }
