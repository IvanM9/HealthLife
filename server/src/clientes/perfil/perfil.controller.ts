/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { Roles } from 'src/auth/session/roles.decorator';
import { RolesGuard } from 'src/auth/session/roles.guard';
import { UpdateClienteDto } from './dtos/UpdateCliente.dto';
import { PerfilService } from './perfil.service';

@ApiBearerAuth()
@Controller('cliente/perfil')
@ApiTags('perfil - cliente')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Cliente)
export class PerfilController {
    constructor(private servicio: PerfilService) { }

    @Get('imc/:talla/:peso')
    async obtenerIMC(@Param('talla') talla: number, @Param('peso') peso: number) {
        return this.servicio.obtenerIMC(talla, peso);
    }

    @Get('/:id')
    async perfil(@Req() req, @Param('id') id: number) {
        return this.servicio.obtenerDatosPerfil(req.user.roles[0] == Role.Cliente ? req.user.id : id);
    }

    @Put('/modificarPerfil')
    async modificarPerfil(@Req() req, @Body() datos: UpdateClienteDto) {
        return this.servicio.modificarPerfil(req.user.id, datos, req.user.email);
    }
}
