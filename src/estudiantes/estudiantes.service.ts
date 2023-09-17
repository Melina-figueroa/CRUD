import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { Repository, FindOneOptions, FindManyOptions } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteDTO } from './dto/estudiantes.dto';

@Injectable()
export class EstudianteService {
  private estudiantes: Estudiante[] = [];

  constructor(
    @InjectRepository(Estudiante)
    private readonly estudianteRepository: Repository<Estudiante>,
    @InjectRepository(Clase)
    private readonly claseRepository: Repository<Clase>,
  ) {}

  public async getAllRaw(): Promise<Estudiante[]> {
    try {
      let estudiante = await this.estudianteRepository.query(
        'SELECT * FROM estudiantes',
      );
      estudiante.forEach((e) => {
        let estudiante: Estudiante = new Estudiante(
          e['idEstudiante'],
          e['nombre'],
          e['apellido'],
        );
        this.estudiantes.push(estudiante);
      });
      return this.estudiantes;
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
  public async getAll(): Promise<Estudiante[]> {
    try {
      let criterio: FindManyOptions = { relations: ['clases'] };
      let estudiantes: Estudiante[] =
        await this.estudianteRepository.find(criterio);
        return estudiantes;
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
  public async getById(id: number): Promise<Estudiante> {
    try {
      const criterio: FindOneOptions = { where: { idEstudiante: id } };
      let estudiante: Estudiante =
        await this.estudianteRepository.findOne(criterio);
      this.estudiantes = [];
      if (estudiante) this.estudiantes.push(estudiante);
      else throw new Error('La estudiante no se encuentra.');
      return estudiante;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda de estudiante ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  public async getByIdCompleto(id: number): Promise<Estudiante[]> {
    try {
      this.estudiantes = [];
      const criterio: FindOneOptions = {
        relations: ['clases'],
        where: { idEstudiante: id },
      };
      let estudiante: Estudiante =
        await this.estudianteRepository.findOne(criterio);
      if (estudiante) this.estudiantes.push(estudiante);
      else throw new Error('La estudiante no se encuentra.');
      return this.estudiantes;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en la busqueda de estudiante ' + id + ' : ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
  //agrega datos
  public async crear_estudiante(datos: any): Promise<string> {
    try {
      if (datos)
        if (
          datos.idEstudiante &&
          datos.nombre &&
          datos.apellido &&
          datos.fechaNacimiento
        )
          if (await this.existeEstudiante(datos.idEstudiante)) {
            throw new Error('La estudiante ya se encuentra.');
          } else {
            await this.estudianteRepository.save(
              new Estudiante(
                datos.idEstudiante,
                datos.nombre,
                datos.apellido,
              ),
            );
          }
        else throw new Error('Los datos para crear estudiante no son válidos');
      else throw new Error('No hay datos para crear estudiante');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }

  public async delete(id: number): Promise<string> {
    try {
      if (id)
        if (await this.existeEstudiante(id)) {
          await this.estudianteRepository.delete(id);
        } else throw new Error('La estudiante no se encuentra.');
      else throw new Error('No hay datos para eliminar estudiantes');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  public async update(id: number, datos: any): Promise<string> {
    try {
      if (datos)
        if (
          datos.idEstudiante &&
          datos.apellidoNombres &&
          datos.fechaNacimiento
        )
          if (await this.existeEstudiante(id)) {
            let criterio: FindOneOptions = { where: { idEstudiante: id } };
            let estudiante: Estudiante =
              await this.estudianteRepository.findOne(criterio);
            estudiante.setNombre(datos.nombre);
            estudiante.setApellido(datos.apellido);
            estudiante.setFechaNacimiento(datos.fechaNacimiento);
            await this.estudianteRepository.save(estudiante);
          } else throw new Error('La estudiante no se encuentra.');
        else
          throw new Error('Los datos para modificar estudiante no son validos');
      else throw new Error('No hay datos para modificar estudiantes');
      return 'ok';
    } catch (error) {
      return error.message;
    }
  }
  /////
  private async existeEstudiante(id: number): Promise<boolean> {
    let criterio: FindOneOptions = { where: { idEstudiante: id } };
    let estudiante: Estudiante =
      await this.estudianteRepository.findOne(criterio);
    return estudiante != null;
  }
}
