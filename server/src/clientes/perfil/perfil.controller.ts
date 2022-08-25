/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { Roles } from 'src/auth/session/roles.decorator';
import { RolesGuard } from 'src/auth/session/roles.guard';
import { PerfilService } from './perfil.service';

@ApiBearerAuth()
@Controller('perfil')
@ApiTags('perfil')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Cliente)
export class PerfilController {
    constructor(private servicio:PerfilService) {}

    @Get('imc/:talla/:peso')
    async obtenerIMC(@Param('talla') talla:number, @Param('peso') peso: number){
        return this.servicio.obtenerIMC(talla, peso);
    }

    @Roles(Role.Cliente)
    @Get()
    async perfil(@Req() req) {
        return this.servicio.obtenerDatosPerfil(req.user.id);
    }
}
