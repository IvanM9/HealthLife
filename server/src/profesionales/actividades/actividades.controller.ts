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
@UseGuards(JwtAuthGuard, RolesGuard)
export class ActividadesController {
    constructor(private servicio: ActividadesService) { }

    @Post('crearPlan')
    @Roles(Role.Entrenador, Role.Nutricionista, Role.Admin)
    async crearActividad(@Body() plan: PlanesDto, @Req() req) {
        plan.publico = req.user.roles[0] == Role.Admin ? true : plan.publico;
        return this.servicio.crearPlan(plan, req.user.roles[0] == Role.Admin ? null : req.user.id);
    }

    @Get('obtener_planes/:idprofesional')
    async obtenerPlan(@Param('idprofesional') id: number, @Req() req) {
        let identficador = req.user.roles[0] == Role.Entrenador || req.user.roles[0] == Role.Nutricionista || req.user.roles[0] == Role.Admin ? req.user.id : id;
        identficador = identficador == 0 ? "null" : identficador;
        return this.servicio.obtenerPlan(identficador);
    }

    @Get('obtener_actividades/:idplan')
    async obtenerActividades(@Param('idplan') id: number) {
        return this.servicio.obtenerActividades(id);
    }

    @Get('obtener_profesionales')
    async obtenerProfesionales() {
        return this.servicio.obtenerProfesionales();
    }

    @Put('modificar_plan/:idplan')
    @Roles(Role.Entrenador, Role.Nutricionista, Role.Admin)
    async modificarPlan(@Param('idplan') id: number, @Body() plan: UpdatePlanesDto) {
        return this.servicio.modificarPlan(plan, id);
    }

    @Roles(Role.Entrenador, Role.Nutricionista, Role.Admin)
    @Get('obtenerClientesSuscritos')
    async obtenerClientesSuscritos(@Req() req:any){
        return this.servicio.obtenerClientesSuscritos(req.user.id);
    }

}
