import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:"ciudad"})
export class Ciudad{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    constructor(nombre:string){
        this.nombre = nombre
    }
    public getId():number{
        return this.id;
    }
    public getNombre():string{
        return this.nombre;
    }
    public setNombre(nombre:string){
        this.nombre = nombre;
    }
}