import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PacienteComponent } from './components/paciente/paciente.component';
import { PacienteService } from './service/paciente.service';
import { TurnoComponent } from './components/turno/turno.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent},
  { path: 'paciente', component: PacienteComponent},
  { path: 'turno', component: TurnoComponent},
  { path: 'consulta', component: ConsultaComponent},
  { path: '**', pathMatch:'full',redirectTo:'inicio' },
  { path: '', pathMatch:'full',redirectTo:'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PacienteService],
})
export class AppRoutingModule { }
