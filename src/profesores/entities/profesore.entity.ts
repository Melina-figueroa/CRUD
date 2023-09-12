import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"profesores"})
export class Profesor{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    apellidoNombre:string;

    constructor(nombre:string){
        this.apellidoNombre = nombre
    }
    public getId():number{
        return this.id;
    }
    public getNombre():string{
        return this.apellidoNombre;
    }
    public setNombre(nombre:string){
        this.apellidoNombre = nombre;
    }
}