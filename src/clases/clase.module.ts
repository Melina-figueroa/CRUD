import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from './entities/clase.entity';
import { ClaseController } from './clase.controller';
import { ClaseService } from './clase.service';
import { Escuela } from 'src/escuela/entities/escuela.entity';
import { Profesor } from 'src/profesores/entities/profesor.entity';
import { Estudiante } from 'src/estudiantes/entities/estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clase, Profesor, Escuela, Estudiante])],
  controllers: [ClaseController],
  providers: [ClaseService],
})
export class ClaseModule {}
