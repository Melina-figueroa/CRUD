import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { ProfesoresModule } from './profesores/profesores.module';
import { ClasesModule } from './clases/clases.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'tino3719',
    database: 'db_colegio',
    entities: [__dirname + '/**/**/**.entity{.ts,.js}'],
    synchronize: true //solo se usa en modo desarrollador en produccion tenemos acceso a la bd de produccion
  }),
  CiudadModule,
  AsistenciaModule,
  ProfesoresModule,
  ClasesModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
