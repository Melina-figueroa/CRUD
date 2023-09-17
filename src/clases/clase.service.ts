import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';
import {
  Repository,
  FindOneOptions,
  FindOptionsWhere,
  FindManyOptions,
} from 'typeorm';
import { ClaseDTO } from './dto/clase.dto';
import { Clase } from './entities/clase.entity';

@Injectable()
export class ClaseService {
  private clases: Clase[] = [];

  constructor(
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
  ) {}

  public async getAllRaw(): Promise<Clase[]> {
    try {
      let clase = await this.claseRepository.query('SELECT * FROM clases');
      clase.forEach((element) => {
        let clase: Clase = new Clase(
          element['nombre'],
          element['idEscuela'],
          element['idProfesor'],
        );
        this.clases.push(clase);
      });
      return this.clases;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  public async getAll(): Promise<Clase[]> {
    try {
      const criterio: FindManyOptions = { relations: ['estudiantes'] };
      let clases: Clase[] = await this.claseRepository.find(criterio);
      return clases;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda: ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  public async getById(id: number): Promise<Clase> {
    try {
      const criterio: FindOneOptions = {
        relations: ['estudiantes'],
        where: { idClase: id },
      };
      let clase: Clase = await this.claseRepository.findOne(criterio);
      if (clase) this.clases.push(clase);
      else throw new Error('La clase no se encuentra.');
      return clase;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda de clase ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  public async getByIdCompleto(id: number): Promise<any> {
    try {
      let clases = [];
      const criterio: FindOneOptions = {
        relations: ['escuela', 'profesor', 'estudiantes'],
        where: { idClase: id },
      };
      let clase: any = await this.claseRepository.findOne(criterio);
      if (clase) {
        clases.push(clase);
      } else throw new Error('La clase no se encuentra.');
      return clases;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda de clase ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  public async add(datos: ClaseDTO): Promise<string> {
    try {
      let clase: Clase;
      if (datos)
        if (datos.nombre && datos.escuela && datos.profesor) {
          clase = new Clase(datos.nombre, datos.escuela, datos.profesor);
          if (datos.estudiantes) {
            clase.estudiantes = [];
            for (let i = 0; i < datos.estudiantes.length; i++) {
              let estudiante: Estudiante = datos.estudiantes[i];
              console.log(estudiante);
              clase.estudiantes.push(estudiante);
            }
          }
          await this.claseRepository.save(clase);
        } else throw new Error('Los datos para crear clase no son validos');
      else throw new Error('No hay datos para crear clase');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  public async delete(id: number): Promise<string> {
    try {
      if (id)
        if (await this.existeClase(id)) {
          await this.claseRepository.delete(id);
        } else throw new Error('La clase no se encuentra.');
      else throw new Error('No hay datos para eliminar clases');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  public async deleteEstudiante(idC: number, idE: number): Promise<string> {
    try {
      if (idC && idE) {
        const criterio: FindOneOptions = {
          relations: ['estudiantes'],
          where: { idClase: idC },
        };
        let clase: Clase = await this.claseRepository.findOne(criterio);
        if (clase) {
          for (let i = 0; i < clase.estudiantes.length; i++) {
            if (clase.estudiantes[i].getIdEstudiante() == idE)
              clase.estudiantes.splice(i, 1);
          }
          await this.claseRepository.save(clase);
        } else throw new Error('La clase no se encuentra.');
      } else
        throw new Error('No hay datos para eliminar estudiante de la clase');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  public async update(id: number, datos: ClaseDTO): Promise<string> {
    try {
      if (datos)
        if (id && datos.nombre && datos.escuela && datos.profesor)
          if (await this.existeClase(id)) {
            let criterio: FindOneOptions = { where: { idClase: id } };
            let clase: Clase = await this.claseRepository.findOne(criterio);
            clase.setNombre(datos.nombre);
            clase.setEscuela(datos.escuela);
            clase.setProfesor(datos.profesor);
            await this.claseRepository.save(clase);
          } else throw new Error('La clase no se encuentra.');
        else throw new Error('Los datos para modificar clase no son validos');
      else throw new Error('No hay datos para modificar clases');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  /////
  private async existeClase(id: number): Promise<boolean> {
    let criterio: FindOneOptions = { where: { idClase: id } };
    let clase: Clase = await this.claseRepository.findOne(criterio);
    return clase != null;
  }
}
