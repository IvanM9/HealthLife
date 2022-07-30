/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { Roles } from 'src/auth/session/roles.decorator';
import { ActividadesService } from './actividades.service';
import { PlanesDto } from './dtos/planes.dto';

@ApiBearerAuth()
@ApiTags('actividades')
@Controller('actividades')
@UseGuards(JwtAuthGuard)
export class ActividadesController {
    constructor(private servicio:ActividadesService) {}

    @Roles(Role.Entrenador)
    @Roles(Role.Nutricionista)
    @Roles(Role.Admin)
    @Post('crearPlan')
    async crearActividad(@Body() plan:PlanesDto, @Req() req) {
        return this.servicio.crearPlan(plan, req.user.id);
    }

    @Get('obtenerPlanes/:id')
    async obtenerPlan(@Param('id') id:number, @Req() req) {
        const identficador = req.user.rol == Role.Entrenador || req.user.rol== Role.Nutricionista || req.user.rol == Role.Admin ? req.user.id : id; 
        return this.servicio.obtenerPlan(identficador);
    }

    @Get('obtenerActividades/:id')
    async obtenerActividades(@Param('id') id:number) {
        return this.servicio.obtenerActividades(id);
    }

    // TODO: Realizar funciones de modificar y eliminar planes

}
