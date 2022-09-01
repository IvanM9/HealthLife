import { Module } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { SuscripcionesController } from './suscripciones/suscripciones.controller';
import { SuscripcionesService } from './suscripciones/suscripciones.service';
import { PerfilController } from './perfil/perfil.controller';
import { PerfilService } from './perfil/perfil.service';
import { ActividadesController } from './actividades/actividades.controller';
import { ActividadesService } from './actividades/actividades.service';

@Module({
  controllers: [SuscripcionesController, PerfilController, ActividadesController],
  providers: [SuscripcionesService, ConexionService, PerfilService, ActividadesService],
})
export class ClientesModule {}
