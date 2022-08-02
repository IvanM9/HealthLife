/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { Roles } from 'src/auth/session/roles.decorator';
import { RolesGuard } from 'src/auth/session/roles.guard';
import { ActividadesService } from './actividades.service';
import { PlanesDto, UpdatePlanesDto } from './dtos/planes.dto';

@ApiBearerAuth()
@ApiTags('actividades')
@Controller('actividades')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
export class ActividadesController {
    constructor(private servicio:ActividadesService) {}

    @Post('crearPlan')
    @Roles(Role.Entrenador)
    @Roles(Role.Nutricionista)
    @Roles(Role.Admin)
    async crearActividad(@Body() plan:PlanesDto, @Req() req) {
        return this.servicio.crearPlan(plan, req.user.id);
    }

    @Get('obtener_planes/:id')
    async obtenerPlan(@Param('id') id:number, @Req() req) {
        const identficador = req.user.rol == Role.Entrenador || req.user.rol== Role.Nutricionista || req.user.rol == Role.Admin ? req.user.id : id; 
        return this.servicio.obtenerPlan(identficador);
    }

    @Get('obtener_actividades/:id')
    async obtenerActividades(@Param('id') id:number) {
        return this.servicio.obtenerActividades(id);
    }

    @Get('obtener_profesionales')
    async obtenerProfesionales() {
        return this.servicio.obtenerProfesionales();
    }

    // TODO: Realizar funciones de eliminar planes
    @Put('modificar_plan/:id')
    @Roles(Role.Entrenador)
    @Roles(Role.Nutricionista)
    @Roles(Role.Admin)
    async modificarPlan(@Param('id') id:number, @Body() plan:UpdatePlanesDto) {
        return this.servicio.modificarPlan(plan, id);
    }

}
