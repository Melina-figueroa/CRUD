import { IsNotEmpty } from "class-validator";
import { CiudadProfesor } from "src/ciudad/entities/ciudad_profesor.entity";
import { Clase } from "src/clases/entities/clase.entity";
import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'profesor'})
export class Profesor {
    @PrimaryGeneratedColumn()
     id: number;

    @Column()
    @IsNotEmpty()
    nombre : string;

    @Column()
    @IsNotEmpty()
    apellido : string;
    
    @OneToMany(() => Clase, clases => clases.profesor)
     clases : Clase[];

     @OneToMany(()=> CiudadProfesor,domicilios=>domicilios.profesor)
     domicilios: CiudadProfesor[];

    constructor (nombre : string, apellido: string) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public getIdProfesor(): number { return this.id; }
    public setIdProfesor(idProfesor: number): void { this.id = idProfesor; }
    public getNombre(): string { return this.nombre; }
    public setNombre(nombre: string): void { this.nombre = nombre; }
    public getApellido(): string { return this.apellido; }
    public setApellido(apellido: string): void { this.apellido = apellido; }
}   