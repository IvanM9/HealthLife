/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { usuarioDto } from './dtos/usuario.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
    constructor(private conexion: ConexionService, private jwt: JwtService) {

    }
    // TODO: Cambiar parametros de las funciones
    async registrarUsuario(datos: usuarioDto) {
        datos.clave = await hash(datos.clave, 10);
        const retorno = (await this.conexion.executeProcedure('registrar_cliente', [
            datos.nombres,
            datos.apellidos,
            datos.clave,
            datos.correo,
            datos.direccion,
            datos.telefono,
            datos.rol
        ]));
        if (!retorno) throw new HttpException('Error al registrar', 500);
        return { "mensaje": "Usuario registrado correctamente" };

    }

    async login(datos: usuarioDto) {
        const retorno = await this.conexion.executeProcedure('obtener_cliente', [datos.correo]);
        if (!retorno) throw new HttpException('Usuario no existe', 500);
        const valido = await compare(datos.clave, retorno.clave);
        if (!valido) throw new HttpException('Clave incorrecta', 500);
        const token = this.jwt.sign({ id: retorno.id.toString().trim(), name: retorno.nombres.toString().trim(), email: retorno.correo.toString().trim(), rol: [retorno.rol.toString().trim()] });
        //* Para verificar el token, se debe envíar por medio del auth bearer el token
        return { "mensaje": "Usuario logueado correctamente", token };
    }

    async obtenerPerfil(correo: string) {
        const retorno = (await this.conexion.executeProcedure('obtener_cliente', [correo]));
        if (!retorno) throw new HttpException('Usuario no existe', 500);
        return {
            "nombres": retorno.nombres.toString().trim(),
            "apellidos": retorno.apellidos.toString().trim(),
            "correo": retorno.correo.toString().trim(),
            "direccion": retorno.direccion.toString().trim(),
            "telefono": retorno.telefono.toString().trim()
        };
    }
}
