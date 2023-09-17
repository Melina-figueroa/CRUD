import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Profesor } from 'src/profesores/entities/profesor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'clases' })
export class Clase {
  //Atributos
  @PrimaryGeneratedColumn()
   id: number;

  @Column()
   nombre: string;

  @ManyToOne(() => Escuela, (escuela) => escuela.clases)
  @JoinColumn({ name: 'fk_id_profesor' })
  escuela: Escuela;

  @ManyToOne(() => Profesor, (profesor) => profesor.clases)
  @JoinColumn({ name: 'fk_id_escuela' })
  profesor: Profesor;

  @ManyToMany((type) => Estudiante, (estudiantes) => estudiantes.clases )
  @JoinTable({name: 'clases_estudiantes'})
  estudiantes: Estudiante[];

  @OneToMany((type) => Asistencia, (asistencia) => asistencia.clase)
  @JoinColumn()
  asistencias: Asistencia[];

  constructor(nombre: string, escuela: Escuela, profesor: Profesor) {
    this.nombre = nombre;
    this.escuela = escuela;
    this.profesor = profesor;
  }

  public getIdClase(): number {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }
  public getEscuela(): Escuela {
    return this.escuela;
  }
  public setEscuela(escuela: Escuela): void {
    this.escuela = escuela;
  }
  public getProfesor(): Profesor {
    return this.profesor;
  }
  public setProfesor(profesor: Profesor): void {
    this.profesor = profesor;
  }
}
