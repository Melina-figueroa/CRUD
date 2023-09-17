import { Escuela } from "src/escuela/entities/escuela.entity";
import { Estudiante } from "src/estudiantes/entities/estudiante.entity";
import { Profesor } from "src/profesores/entities/profesor.entity";

export class ClaseDTO {
    readonly nombre : string;
    readonly escuela : Escuela;
    readonly profesor : Profesor;
    readonly estudiantes : Estudiante[];
}