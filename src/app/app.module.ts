import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { PacienteService } from './service/paciente.service';
import { TurnoComponent } from './components/turno/turno.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { GestionPacientesComponent } from './components/gestion-pacientes/gestion-pacientes.component';
import { GestionEspecialistaComponent } from './components/gestion-especialista/gestion-especialista.component';
import { NgxDataTableModule} from "angular-9-datatable";
import { ConsultaEspComponent } from './components/consulta-esp/consulta-esp.component';
import { ModificarPacienteComponent } from './components/modificar-paciente/modificar-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServiciosComponent,
    RegistroComponent,
    LoginComponent,
    TurnoComponent,
    ConsultaComponent,
    GestionPacientesComponent,
    GestionEspecialistaComponent,
    ConsultaEspComponent,
    ModificarPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxDataTableModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:1700
    })
  ],
  providers: [
    PacienteService,
    
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
