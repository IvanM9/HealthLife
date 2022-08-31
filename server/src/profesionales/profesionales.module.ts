/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { ActividadesController } from './actividades/actividades.controller';
import { ActividadesService } from './actividades/actividades.service';
import { PerfilController } from './perfil/perfil.controller';
import { PerfilService } from './perfil/perfil.service';

@Module({
  controllers: [ActividadesController, PerfilController],
  providers: [ActividadesService, ConexionService, PerfilService],
})
export class ProfesionalesModule {}
