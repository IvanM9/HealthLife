/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
@Roles(Role.Entrenador)
@Roles(Role.Cliente)
export class ActividadesController {
    constructor(private servicio:ActividadesService) {}

    @Get('obtenerPlanesCreados')
    async obtenerPlanesCreados(@Req() req) {
        return this.servicio.obtenerPlanesCreados(req.user.id);
    }

    @Post('crearPlan')
    async crearActividad(@Body() plan:PlanesDto, @Req() req) {
        return this.servicio.crearPlan(plan, req.user.id);
    }
}
