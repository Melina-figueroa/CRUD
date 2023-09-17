import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Escuela } from './entities/escuela.entity';
import { EscuelaService } from './escuela.service';

@Controller('escuela')
export class EscuelaController {
    constructor(private escuelaService : EscuelaService) {}

    @Get('/raw')
     listarRaw() : Escuela[] | any {
        return this.escuelaService.getAllRaw();
    }
    @Get(':id')
     listarUna(@Param('id') id : number) : Escuela[] | any {
        return this.escuelaService.getById(id);
    }    
    @Get()
     listarTodas() : Escuela[] | any {
        return this.escuelaService.getAll();
    }
    @Post('/crear')    
     agregar(@Body() datos : any) : Escuela[] | any {
        return this.escuelaService.add(datos);
    }
    @Delete(':id')
     eliminar(@Param('id') id : number) : Escuela[] | any {
        return this.escuelaService.delete(id);        
    }
    @Put(':id')
     actualizar(@Param('id') id : number, @Body() datos : any) : Escuela[] | any {
        return this.escuelaService.update(id, datos)
    }
}