import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClaseService } from './clase.service';
import { ClaseDTO } from './dto/clase.dto';
import { Clase } from './entities/clase.entity';
@Controller('clase')
export class ClaseController {
    constructor(private claseService : ClaseService) {}

    @Get('/raw')
    private listarRaw() : Clase[] | any {
        return this.claseService.getAllRaw();
    }
    @Get(':id/estudiantes')
    private listarUnaCompleta(@Param('id') id : number) : Clase[] | any {
        return this.claseService.getByIdCompleto(id);
    }    
    @Get(':id')
    private listarUna(@Param('id') id : number) : Clase[] | any {
        return this.claseService.getById(id);
    }    
    @Get()
    private listarTodas() : Clase[] | any {
        return this.claseService.getAll();
    }
    @Post()    
    private agregar(@Body() datos : ClaseDTO) : Clase[] | any {
        return this.claseService.add(datos);
    }
    @Delete(':idC-:idE')
    private eliminarEstudiante(@Param('idC') idC : number, @Param('idE') idE : number) : Clase[] | any {
        return this.claseService.deleteEstudiante(idC, idE);        
    }
    @Delete(':id')
    private eliminar(@Param('id') id : number) : Clase[] | any {
        return this.claseService.delete(id);        
    }
    @Put(':id')
    private actualizar(@Param('id') id : number, @Body() datos : ClaseDTO) : Clase[] | any {
        return this.claseService.update(id, datos)
    }
}