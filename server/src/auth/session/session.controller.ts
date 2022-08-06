/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClienteDto } from './dtos/cliente.dto';
import { ProfesionalDto } from './dtos/profesional.dto';
import { LoginDto, usuarioDto } from './dtos/usuario.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SessionService } from './session.service';

@ApiBearerAuth()
@ApiTags('sesion')
@Controller('session')
export class SessionController {
    constructor(private servicio: SessionService) {
    }

    @Post('registrar/profesional')
    async registrarProfesional(@Body() usuario: ProfesionalDto) {
        return this.servicio.registrarProfesional(usuario);
    }

    @Post('registrar/cliente')
    async registrarCliente(@Body() usuario: ClienteDto) {
        return this.servicio.registrarCliente(usuario);
    }

    @Post('login')
    async login(@Body() usuario: LoginDto) {
        return this.servicio.login(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    async perfil(@Request() req) {
        return this.servicio.obtenerPerfil(req.user.email);
    }
}
