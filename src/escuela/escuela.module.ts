import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clase } from 'src/clases/entities/clase.entity';
import { Escuela } from './entities/escuela.entity';
import { EscuelaController } from './escuela.controller';
import { EscuelaService } from './escuela.service';

@Module({
  imports : [ 
    TypeOrmModule.forFeature([ Escuela, Clase ])
  ],
  controllers: [EscuelaController],
  providers: [EscuelaService]
})
export class EscuelaModule {}