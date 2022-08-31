/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/session/jwt-auth.guard';
import { Role } from 'src/auth/session/role.enum';
import { RolesGuard } from 'src/auth/session/roles.guard';
import { PerfilService } from './perfil.service';

@ApiBearerAuth()
@ApiTags('perfil-profesional')
@Controller('profesional/perfil')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PerfilController {
    constructor(private perfil: PerfilService) { }

    @Get('/:id')
    async obtenerPerfil(@Param('id') id: number, @Req() req: any) {
        return this.perfil.obtenerPerfil(req.user.roles[0] == Role.Cliente ? id : req.user.id);
    }
}
