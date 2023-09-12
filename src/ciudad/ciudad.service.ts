import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';

@Injectable()
export class CiudadService {
  private ciudades: Ciudad[] = [];

  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

//Obtener todos los elementos
  async findAllRaw():Promise<Ciudad[]>{
    this.ciudades = [];
    let datos = await this.ciudadRepository.query("select * from ciudad");

    datos.forEach(element => {
        let ciudad : Ciudad = new Ciudad(element['nombre']);
        this.ciudades.push(ciudad)
    });

    return this.ciudades;
}

//Arreglo de objetos de ciudad, nos devuelve una promesa con objetos, metodo que nos provee repository
async findAllOrm():Promise<Ciudad[]>{
    return await this.ciudadRepository.find();
}

async findById(id :number) : Promise<Ciudad> {
    try{
        const criterio : FindOneOptions = { where: { id:id} };
        const ciudad : Ciudad = await this.ciudadRepository.findOne( criterio );
        if(ciudad)
            return ciudad
        else  
            throw new Error('No se encuentra la ciudad');
    }
    catch(error){
        throw new HttpException({
            status: HttpStatus.CONFLICT,
            error: 'Error en ciudad - ' + error
        },HttpStatus.NOT_FOUND)
    }
    
}

  //Servicio encargado de crear la ciudad
  async create(createCiudadDto: CreateCiudadDto): Promise<string> {
    try {
      let ciudad: Ciudad = await this.ciudadRepository.save(
        new Ciudad(createCiudadDto.nombre),
      );
      if (ciudad) return `Ciudad creada con exito`;
      else throw new Error('No se pudo crear la cuidad');
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en ciudad - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  
  //Servicio encargado de actualizar la ciudad
  async update(id: number, updateCiudadDto: UpdateCiudadDto): Promise<String> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (!ciudad)
        throw new Error('no se pudo encontrar la ciudad a modificar ');
      else {
        let ciudadVieja = ciudad.getNombre();
        ciudad.setNombre(updateCiudadDto.nombre);
        ciudad = await this.ciudadRepository.save(ciudad);
        return `OK - ${ciudadVieja} --> ${updateCiudadDto.nombre}`;
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en ciudad - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(id: number): Promise<any> {
    try {
      const criterio: FindOneOptions = { where: { id: id } };
      let ciudad: Ciudad = await this.ciudadRepository.findOne(criterio);
      if (!ciudad) throw new Error('no se eliminar ciudad ');
      else {
        await this.ciudadRepository.remove(ciudad);
        return { id: id, message: 'se elimino exitosamente' };
      }
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Error en ciudad - ' + error,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
