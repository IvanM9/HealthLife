/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { Roles } from 'src/auth/session/roles.decorator';
import { SuscripcionDto } from './dtos/suscripcion.dto';
import { SuscripcionesService } from './suscripciones.service';

@ApiBearerAuth()
@Controller('suscripciones')
@ApiTags('Suscripciones')
@UseGuards(JwtAuthGuard)
export class SuscripcionesController {
    constructor(private servicio:SuscripcionesService){}

    @Roles(Role.Cliente)
    @Post('suscribirse')
    async suscribirse(@Body() datos:SuscripcionDto, @Req() req:any){
       return  this.servicio.suscribirse(req.user.id, datos.id_plan);
    }

    @Get('obtenerPlanesGenerales')
    async obtenerPlanesGenerales(){
        return this.servicio.obtenerPlanesGenerales();
    }
}
