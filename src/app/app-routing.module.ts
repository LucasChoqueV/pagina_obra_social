import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PacienteService } from './service/paciente.service';
import { TurnoComponent } from './components/turno/turno.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { ConsultaEspComponent } from './components/consulta-esp/consulta-esp.component';
import { GestionPacientesComponent } from './components/gestion-pacientes/gestion-pacientes.component';
import { GestionEspecialistaComponent } from './components/gestion-especialista/gestion-especialista.component';
import { ModificarPacienteComponent } from './components/modificar-paciente/modificar-paciente.component';


const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent},
  { path: 'turno', component: TurnoComponent},
  { path: 'gestionEsp', component: GestionEspecialistaComponent},
  { path: 'gestionPac', component: GestionPacientesComponent},
  { path: 'consulta', component: ConsultaComponent},
  { path: 'consultaEsp', component: ConsultaEspComponent},
  { path: 'modificar-paciente', component: ModificarPacienteComponent},
  { path: '**', pathMatch:'full',redirectTo:'inicio' },
  { path: '', pathMatch:'full',redirectTo:'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
  providers: [PacienteService],
})
export class AppRoutingModule { }
