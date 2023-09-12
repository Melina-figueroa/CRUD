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
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
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
  async create(@Body() createCiudadDto: CreateCiudadDto) {
    return await this.ciudadService.create(createCiudadDto);
  }

  @Put('actualizar/:id')
  async update(
    @Param('id') id: number,
    @Body() updateCiudadDto: UpdateCiudadDto,
  ): Promise<String> {
    return this.ciudadService.update(id, updateCiudadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<Ciudad> {
    return this.ciudadService.remove(id);
  }
}
