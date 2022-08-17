import { Module } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { SuscripcionesController } from './suscripciones/suscripciones.controller';
import { SuscripcionesService } from './suscripciones/suscripciones.service';
import { PerfilController } from './perfil/perfil.controller';
import { PerfilService } from './perfil/perfil.service';

@Module({
  controllers: [SuscripcionesController, PerfilController],
  providers: [SuscripcionesService, ConexionService, PerfilService],
})
export class ClientesModule {}
