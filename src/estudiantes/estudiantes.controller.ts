import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Estudiante } from './entities/estudiante.entity';
import { EstudianteService } from './estudiantes.service';
import { EstudianteDTO } from './dto/estudiantes.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private estudianteService: EstudianteService) {}

  @Get('/raw')
  listarRaw(): Promise<Estudiante[]> {
    return this.estudianteService.getAllRaw();
  }

  @Get(':id/clases')
  async listarUnaCompleta(@Param('id') id: number): Promise<Estudiante[]> {
    return this.estudianteService.getByIdCompleto(id);
  }

  @Get(':id')
  async listarUna(@Param('id') id: number): Promise<Estudiante> {
    return this.estudianteService.getById(id);
  }

  @Get('/todos')
  async listarTodas(): Promise<Estudiante[]> {
    return this.estudianteService.getAll();
  }

  @Post('/crear')
 async crear_estudiante(@Body() estudianteDto: EstudianteDTO){
    return await this.estudianteService.crear_estudiante(estudianteDto);
  }

  @Delete(':id')
  async eliminar(@Param('id') id: number): Promise<string> {
    return this.estudianteService.delete(id);
  }

  @Put(':id')
  async actualizar(@Param('id') id: number, @Body() datos: any): Promise<string> {
    return this.estudianteService.update(id, datos);
  }
}
