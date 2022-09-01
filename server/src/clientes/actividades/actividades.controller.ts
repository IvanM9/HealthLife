/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { Roles } from 'src/auth/session/roles.decorator';
import { RolesGuard } from 'src/auth/session/roles.guard';
import { ModificarSuscripcionDto } from '../suscripciones/dtos/suscripcion.dto';
import { ActividadesService } from './actividades.service';
import { RegistrosDto, UpdateRegistroDto } from './Dtos/registros.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Actividades')
@Controller('actividades')
@Roles(Role.Cliente)
export class ActividadesController {
    constructor(private actividades:ActividadesService){}

    @Get('/:plan')
    async mostrarActividadesRealizadas(@Req() req, @Param('plan') plan:number){
        return this.actividades.mostrarActividadesRealizadas(req.user.id, plan);
    }

    @Post('registrar')
    async registrarActividadRealizada(@Body() datos:RegistrosDto, @Req() req){
        return this.actividades.registrarActividadRealizada(req.user.id, datos);
    }

    @Put('modificar_registro/:idregistro')
    async modificarRegistro(@Param('idregistro') idregistro:number, @Body() realizado:UpdateRegistroDto){
        return this.actividades.actualizarActividadesRealizadas(idregistro,realizado);
    }

}
