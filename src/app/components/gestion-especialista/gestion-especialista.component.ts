import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/models/especialista';
import { EspecialistaService } from 'src/app/service/especialista.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestion-especialista',
  templateUrl: './gestion-especialista.component.html',
  styleUrls: ['./gestion-especialista.component.css']
})
export class GestionEspecialistaComponent implements OnInit {

  especialista: Especialista;
  especialistaBorrar: Especialista;
  especialistas: Array<Especialista>;

  btnGuardar: Boolean = true;
  btnModificar: Boolean = false;

  constructor(private espService: EspecialistaService, private toastr: ToastrService) { 
    this.especialistaBorrar = new Especialista();
    this.especialista = new Especialista();
    this.especialistas = new Array<Especialista>();
    this.refrescarEspecialista();
  }

  ngOnInit(): void {
  }

  //registra las respuestas del asistente
  public registrarEspecialista(){  
    this.espService.createEspecialista(this.especialista).subscribe(
      (result)=>{
        this.toastr.info("Especialista Agregado");
        this.refrescarEspecialista();
      },
      (error)=>{
        console.log(error);
      }
    )
    this.especialista = new Especialista();
  }

  refrescarEspecialista(){
    this.especialistas = new Array<Especialista>();
    this.espService.getEspecialistas().subscribe(
      (result)=>{
        var asist: Especialista = new Especialista();
        result.forEach(element => {
          Object.assign(asist, element);
          this.especialistas.push(asist);
          asist = new Especialista();
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  elegirEspecialista(esp: Especialista){
    var vAsist = new Especialista();
    Object.assign(vAsist,esp);
    this.especialista = vAsist;
    this.btnGuardar = false;
    this.btnModificar = true;
  }

  borrarEspecialista(){
    this.espService.deleteEspecialista(this.especialistaBorrar).subscribe(
      (result)=>{
        this.toastr.info("Especialista borrado.");
        this.especialistaBorrar = new Especialista();
        this.refrescarEspecialista();
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  limpiarEspecialista(){
    this.especialista = new Especialista();
  }

  cancelarModificacion(){
    this.especialista = new Especialista();
    this.btnModificar = false;
    this.btnGuardar = true;
  }

  modificarEspecialista(){
    
    this.espService.updateEspecialista(this.especialista).subscribe(
      (result)=>{
        this.toastr.info("Especialista Modificado.");
        this.refrescarEspecialista();
      },
      (error)=>{
        console.log(error);
      }
    );
    this.especialista = new Especialista();
    this.btnModificar = false;
    this.btnGuardar = true;
  }

  public cargarEspecialistaModal(esp: Especialista){
    this.especialistaBorrar = esp;
  }


}
