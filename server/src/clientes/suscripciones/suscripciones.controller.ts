/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { Roles } from 'src/auth/session/roles.decorator';
import { RolesGuard } from 'src/auth/session/roles.guard';
import { ModificarSuscripcionDto, SuscripcionDto } from './dtos/suscripcion.dto';
import { SuscripcionesService } from './suscripciones.service';

@ApiBearerAuth()
@Controller('suscripciones')
@ApiTags('Suscripciones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuscripcionesController {
    constructor(private servicio:SuscripcionesService){}

    @Post('suscribirse')
    @Roles(Role.Cliente)
    async suscribirse(@Body() datos:SuscripcionDto, @Req() req:any){
       return  this.servicio.suscribirse(req.user.id, datos.id_plan);
    }

    @Get('obtener_planes_generales/:tipo')
    async obtenerPlanesGenerales(@Param('tipo') tipo:number){
        return this.servicio.obtenerPlanesGenerales(tipo);
    }

    @Get('obtener_planes_recomendados')
    @Roles(Role.Cliente)
    async obtenerPlanesRecomendados(@Req() req:any){
        console.log(req.user)
        return this.servicio.obtenerPlanesRecomendados(req.user.id);
    }

    @Put('modificar_suscripcion')
    async modificarSuscripcion(@Body() datos:ModificarSuscripcionDto, @Req() req:any){
        return this.servicio.modificar_suscripcion(req.user.id, datos);
    }

    @Get('planes_suscritos')
    async planesSuscritos(@Req() req:any){
        return this.servicio.planesSuscritos(req.user.id);
    }


    // TODO: Realizar funciones de eliminar suscripciones
}
