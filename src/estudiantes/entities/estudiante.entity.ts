import { Asistencia } from 'src/asistencia/entities/asistencia.entity';
import { Clase } from 'src/clases/entities/clase.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'estudiantes' })
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  fecha_nacimiento: Date;

  @ManyToMany((type) => Clase, (clases) => clases.estudiantes)
  clases: Clase[];

  @OneToMany((type) => Asistencia, (asistencia) => asistencia.estudiante)
  public asistencias: Asistencia[];

  constructor(nombre: string, apellido: string, fecha: Date) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_nacimiento = fecha;
  }

  public getIdEstudiante(): number {
    return this.id;
  }
  public setIdEstudiante(idEstudiante: number): void {
    this.id = idEstudiante;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }
  public getApellido(): string {
    return this.apellido;
  }
  public setApellido(apellido: string): void {
    this.apellido = apellido;
  }
  public getFechaNacimiento(): Date {
    return this.fecha_nacimiento;
  }
  public setFechaNacimiento(fechaNacimiento: Date): void {
    this.fecha_nacimiento = fechaNacimiento;
  }
}
