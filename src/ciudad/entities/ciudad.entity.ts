import { Escuela } from "src/escuela/entities/escuela.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CiudadProfesor } from "./ciudad_profesor.entity";


@Entity({name:'ciudad'})
export class Ciudad{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string; 

    @OneToMany(()=>Escuela,escuela=>escuela.ciudad)
    public escuelas:Escuela[];

    @OneToMany(()=>CiudadProfesor,domicilios=>domicilios.ciudad)
    domicilios: CiudadProfesor[];

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