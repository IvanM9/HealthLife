/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { ActividadesController } from './actividades/actividades.controller';
import { ActividadesService } from './actividades/actividades.service';

@Module({
  controllers: [ActividadesController],
  providers: [ActividadesService, ConexionService],
})
export class ProfesionalesModule {}
