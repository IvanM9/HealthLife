/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { LoginDto, usuarioDto } from './dtos/usuario.dto';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ProfesionalDto } from './dtos/profesional.dto';
import { ClienteDto } from './dtos/cliente.dto';

@Injectable()
export class SessionService {
    constructor(private conexion: ConexionService, private jwt: JwtService) {}

    async registrarUsuario(datos: usuarioDto, rol: string) {
        console.log(datos, rol);
        datos.clave = await hash(datos.clave, 10);
        const retorno = await this.conexion.executeProcedure('insert_usuario', [
            datos.nombres.trim(),
            datos.apellidos.trim(),
            datos.correo.toLowerCase().trim(),
            datos.clave,
            rol.trim(),
            datos.sexo.trim()
        ]);
        if (!retorno) throw new HttpException('Error al registrar el usuario', 400);
        return retorno;
    }

    async registrarProfesional(datos: ProfesionalDto) {
        if (datos.rol != "entrenador" && datos.rol != "nutricionista") throw new HttpException('Rol incorrecto', 400);
        const id = await this.registrarUsuario(datos, datos.rol);
        if (!id || id == null) throw new HttpException('Error al registrar', 400);
        const retorno = await this.conexion.executeProcedure('insert_profesional', [id, datos.descripcion, datos.links]);
        if (!retorno) throw new HttpException('Error al registrar el profesional', 400);
        // TODO: Si el profesional no se registra correctamente, se debe eliminar el usuario
        return { mensaje: "Profesional registrado correctamente" };
    }

    async registrarCliente(datos: ClienteDto) {
        const id = await this.registrarUsuario(datos, "cliente");
        if (!id || id == null) throw new HttpException('Error al registrar', 400);
        const retorno = await this.conexion.executeProcedure('insert_cliente', [
            datos.talla,
            datos.peso,
            datos.habitos,
            datos.alergias,
            datos.enfermedades,
            datos.detalles_extras,
            id]);
        if (!retorno) throw new HttpException('Error al registrar el cliente', 400);
        return {
            mensaje: "Cliente registrado correctamente",
        };
    }

    async login(datos: LoginDto) {
        const retorno = await this.conexion.executeProcedure('login', [datos.correo.toLowerCase().trim()]);
        if (retorno.clave == undefined || retorno.clave == null) throw new HttpException('Usuario no existe', 400);
        const valido = await compare(datos.clave, retorno.clave);
        if (!valido) throw new HttpException('Clave incorrecta', 400);
        const token_id = this.jwt.sign({ id: retorno.id.toString().trim(), email: retorno.correo.toString().trim(), rol: [retorno.rol.toString().trim()] });
        return { "mensaje": retorno.rol.toString().trim() + ' logueado correctamente', token_id, rol: retorno.rol.toString().trim(), nombres: retorno.nombres.trim() };
    }

    
}
