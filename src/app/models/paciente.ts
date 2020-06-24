import { Persona } from './persona';
export class Paciente extends Persona{

    _id:number;
    constructor(_id?:number,apellido?:string,nombre?:string,dni?:number,direccion?:string,telefono?:string,email?:string,fechaNacimiento?:Date,perfil?:string, contrasena?:string){
        super(_id,apellido,nombre,dni,direccion,telefono,email,fechaNacimiento,perfil);

    }
}
