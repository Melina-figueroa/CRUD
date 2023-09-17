import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AsistenciaDTO } from './dto/asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectRepository(Asistencia)
    private readonly asistenciaRepository: Repository<Asistencia>,
  ) {}

  public async getAllRaw(): Promise<Asistencia[]> {
    try {
      const datos = await this.asistenciaRepository.query(
        'select * from asistencias',
      );

      // Crear un array de Asistencia directamente desde los datos
      const asistencias = datos.map((e) => new Asistencia(
        e.claseIdClase,
        e.estudianteIdEstudiante,
        new Date(e.fecha), // Convertir la fecha a un objeto Date
      ));

      return asistencias;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la búsqueda: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async getAll(): Promise<Asistencia[]> {
    try {
      const asistencias = await this.asistenciaRepository.find({
        relations: ['clase', 'estudiante'],
      });

      if (asistencias.length > 0) {
        return asistencias;
      } else {
        throw new Error('No se encuentran asistencias.');
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la búsqueda: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async getById(id: number): Promise<Asistencia> {
    try {
      const criterio: FindOneOptions = {
        relations: ['clase', 'estudiante'],
        where: { idAsistencia: id },
      };
      const asistencia = await this.asistenciaRepository.findOne(criterio);

      if (asistencia) {
        return asistencia;
      } else {
        throw new Error('La asistencia no se encuentra.');
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la búsqueda de asistencia ' + id + ': ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async getByClaseEstudiante(idC: number, idE: number): Promise<Asistencia[]> {
    try {
      const criterio: FindManyOptions = { relations: ['clase', 'estudiante'] };
      const datos = await this.asistenciaRepository.find(criterio);
      const asistencias: Asistencia[] = [];

      for (let i = 0; i < datos.length; i++) {
        const dato = datos[i];
        if (
          dato.clase?.getIdClase() === idC &&
          dato.estudiante?.getIdEstudiante() === idE
        ) {
          asistencias.push(dato);
        }
      }

      if (asistencias.length > 0) {
        return asistencias;
      } else {
        throw new Error('La asistencia no se encuentra.');
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la búsqueda de asistencia ' + idC + ' - ' + idE + ': ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  public async add(datos: AsistenciaDTO): Promise<string> {
    try {
      if (datos && datos.clase && datos.estudiante && datos.fecha) {
        const asistencia = new Asistencia(datos.clase, datos.estudiante, new Date(datos.fecha));
        await this.asistenciaRepository.save(asistencia);
        return 'ok';
      } else {
        throw new Error('Los datos para crear asistencia no son válidos');
      }
    } catch (error) {
      return error.message;
    }
  }

  public async delete(ids: string): Promise<string> {
    try {
      if (ids) {
        const id = ids.split('.');
        const criterio: FindManyOptions = { relations: ['clase', 'estudiante'] };
        const datos = await this.asistenciaRepository.find(criterio);

        for (let i = 0; i < datos.length; i++) {
          const dato = datos[i];
          if (
            dato.clase?.getIdClase() === parseInt(id[0]) &&
            dato.estudiante?.getIdEstudiante() === parseInt(id[1]) &&
            dato.fecha?.toISOString() === id[2] // Convertir a ISOString para comparar fechas
          ) {
            await this.asistenciaRepository.delete(dato.id);
            return 'ok';
          }
        }

        throw new Error('La asistencia no se encuentra.');
      } else {
        throw new Error('No hay datos para eliminar asistencias');
      }
    } catch (error) {
      return error.message;
    }
  }

  // Resto del código...
}
