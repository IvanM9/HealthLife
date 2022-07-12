/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { usuarioDto } from './dtos/usuario.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SessionService } from './session.service';

@ApiBearerAuth()
@ApiTags('sesion')
@Controller('session')
export class SessionController {
    constructor(private servicio: SessionService) {
    }

    @Post('registrar')
    async registrarUsuario(@Body() usuario: usuarioDto) {
        return this.servicio.registrarUsuario(usuario);
    }

    @Post('login')
    async login(@Body() usuario: usuarioDto) {
        return this.servicio.login(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    async perfil(@Request() req) {
        return this.servicio.obtenerPerfil(req.user.email);
    }
}
