import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadDto } from './dto/ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';

@Controller('ciudad')
export class CiudadController {
  constructor(private readonly ciudadService: CiudadService) {}

  @Get('raw')
  async getAllRaw(): Promise<Ciudad[]> {
    return await this.ciudadService.findAllRaw();
  }

  @Get('orm')
  async getAllOrm(): Promise<Ciudad[]> {
    return await this.ciudadService.findAllOrm();
  }

  @Get(':id')
  async getId(@Param('id') id: number): Promise<Ciudad> {
    return await this.ciudadService.findById(id);
  }

  @Post('crear')
  async crear_ciudad(@Body() createCiudadDto: CiudadDto) {
    return await this.ciudadService.crear_ciudad(createCiudadDto);
  }

  @Put('actualizar/:id')
  async actualizar_ciudad(
    @Param('id') id: number,
    @Body() updateCiudadDto: CiudadDto,
  ): Promise<String> {
    return this.ciudadService.actualizar_ciudad(id, updateCiudadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Ciudad> {
    return this.ciudadService.remove(id);
  }
}
