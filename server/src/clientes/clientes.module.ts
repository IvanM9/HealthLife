import { Module } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { SuscripcionesController } from './suscripciones/suscripciones.controller';
import { SuscripcionesService } from './suscripciones/suscripciones.service';

@Module({
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService, ConexionService],
})
export class ClientesModule {}
