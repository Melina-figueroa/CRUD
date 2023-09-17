import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AsistenciaService } from './asistencia.service';
import { AsistenciaDTO } from './dto/asistencia.dto';
import { Asistencia } from './entities/asistencia.entity';

@Controller('asistencia')
export class AsistenciaController {
    constructor(private asistenciaService : AsistenciaService) {}

    @Get('/raw')
    private listarRaw() : Asistencia[] | any {
        return this.asistenciaService.getAllRaw();
    }
    @Get(':idC-:idE')
    private listarClase(@Param('idC') idC : number, @Param('idE') idE : number) : Asistencia[] | any {
        return this.asistenciaService.getByClaseEstudiante(idC, idE);
    }    
    @Get(':id')
    private listarUna(@Param('id') id : number) : Asistencia[] | any {
        return this.asistenciaService.getById(id);
    }    
    @Get()
    private listarTodas() : Asistencia[] | any {
        return this.asistenciaService.getAll();
    }
    @Post()    
    private agregar(@Body() datos : AsistenciaDTO) : Asistencia[] | any {
        return this.asistenciaService.add(datos);
    }
    @Delete(':id')
    private eliminar(@Param('id') id : string) : Asistencia[] | any {
        return this.asistenciaService.delete(id);        
    }
}