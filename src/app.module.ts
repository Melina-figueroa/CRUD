import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadModule } from './ciudad/ciudad.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { EstudiantesModule } from './estudiantes/estudiantes.module';
import { LoginModule } from './login/login.module';
import { ProfesorModule } from './profesores/profesor.module';
import { ClaseModule } from './clases/clase.module';
import { EscuelaModule } from './escuela/escuela.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'app')}),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'tino3719',
    database: 'db_colegio',
    entities: [__dirname + '/**/**/**.entity{.ts,.js}'],
    synchronize: true, //solo se usa en modo desarrollador en produccion tenemos acceso a la bd de produccion
  }),
  LoginModule,
  CiudadModule,
  EscuelaModule,
  ClaseModule,
  AsistenciaModule,
  ProfesorModule,
  EstudiantesModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
