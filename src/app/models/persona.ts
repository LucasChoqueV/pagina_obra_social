export class Persona {

    _id:number;
    apellido:string;
    nombre:string;
    dni:number;
    direccion:string;
    telefono:string;
    email:string;
    fechaNacimiento:Date;
    perfil:string;


    constructor(_id?:number,apellido?:string,nombre?:string,dni?:number,direccion?:string,telefono?:string,email?:string,fechaNacimiento?:Date, perfil?:string){
        this._id = _id;
        this.apellido = apellido;
        this.nombre = nombre;
        this.dni = dni;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
        this.perfil = perfil;
    }
    
}

