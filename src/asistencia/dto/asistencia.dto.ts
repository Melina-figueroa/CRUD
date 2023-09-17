import { Clase } from "src/clases/entities/clase.entity";
import { Estudiante } from "src/estudiantes/entities/estudiante.entity";

export class AsistenciaDTO {
    readonly clase: Clase;
    readonly estudiante: Estudiante;
    readonly fecha: Date;
}
