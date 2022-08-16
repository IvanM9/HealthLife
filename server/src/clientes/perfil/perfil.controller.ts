/* eslint-disable prettier/prettier */
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { RolesGuard } from 'src/auth/session/roles.guard';
import { PerfilService } from './perfil.service';

@ApiBearerAuth()
@Controller('perfil')
@ApiTags('perfil')
@UseGuards(JwtAuthGuard, RolesGuard)

export class PerfilController {
    constructor(private servicio:PerfilService) {}

    @Get('imc')
    async obtenerIMC(@Req() req){
        return this.servicio.obtenerIMC(req.user.id);
    }
}
