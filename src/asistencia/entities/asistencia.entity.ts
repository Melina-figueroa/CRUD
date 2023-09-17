import { Clase } from 'src/clases/entities/clase.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'asistencia'})
export class Asistencia {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;
  
  @ManyToOne(() => Clase)
  clase: Clase;

  @ManyToOne(() => Estudiante)
  estudiante: Estudiante;

  

  constructor(clase: Clase, estudiante: Estudiante, fecha: Date) {
    this.clase = clase;
    this.estudiante = estudiante;
    this.fecha = fecha;
  }

  public getIdAsistencia(): number {
    return this.id;
  }

  public getClase(): Clase {
    return this.clase;
  }

  public setClase(clase: Clase): void {
    this.clase = clase;
  }

  public getEstudiante(): Estudiante {
    return this.estudiante;
  }

  public setEstudiante(estudiante: Estudiante): void {
    this.estudiante = estudiante;
  }

  public getFecha(): Date {
    return this.fecha;
  }

  public setFecha(fecha: Date): void {
    this.fecha = fecha;
  }
}
