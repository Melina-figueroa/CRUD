import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiantes.controller';
import { EstudianteService } from './estudiantes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { Estudiante } from './entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante, Clase])],
  controllers: [EstudianteController],
  providers: [EstudianteService],
})
export class EstudiantesModule {}
