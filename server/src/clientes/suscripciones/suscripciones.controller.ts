/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { Roles } from 'src/auth/session/roles.decorator';
import { RolesGuard } from 'src/auth/session/roles.guard';
import { SuscripcionDto } from './dtos/suscripcion.dto';
import { SuscripcionesService } from './suscripciones.service';

@ApiBearerAuth()
@Controller('suscripciones')
@ApiTags('Suscripciones')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class SuscripcionesController {
    constructor(private servicio:SuscripcionesService){}

    @Post('suscribirse')
    @Roles(Role.Cliente)
    async suscribirse(@Body() datos:SuscripcionDto, @Req() req:any){
       return  this.servicio.suscribirse(req.user.id, datos.id_plan);
    }

    @Get('obtener_planes_generales')
    async obtenerPlanesGenerales(){
        return this.servicio.obtenerPlanesGenerales();
    }

    // TODO: Realizar funciones de eliminar suscripciones
}
