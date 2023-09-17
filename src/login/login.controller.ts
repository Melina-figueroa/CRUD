import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LoginService } from './login.service';
import { Login } from './entities/login.entity';
import { LoginDTO } from './dto/login.dto';

@Controller('login')
export class LoginController {

    constructor(private loginService : LoginService) {}

    @Get(':id')
    private listarUna(@Param('id') id : string) : Login[] | any {
        return this.loginService.getById(id);
    }    
    @Get()
    private listarTodas() : Login[] | any {
        return this.loginService.getAll();
    }
    @Post()    
    private validar(@Body() datos : LoginDTO) : Login[] | any {
        return this.loginService.validar(datos);
    }
}