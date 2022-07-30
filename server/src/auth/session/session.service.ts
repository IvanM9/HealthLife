/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { usuarioDto } from './dtos/usuario.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ProfesionalDto } from './dtos/profesional.dto';
import { ClienteDto } from './dtos/cliente.dto';

@Injectable()
export class SessionService {
    constructor(private conexion: ConexionService, private jwt: JwtService) {

    }

    async registrarUsuario(datos: usuarioDto, rol: string) {
        console.log(datos, rol);
        datos.clave = await hash(datos.clave, 10);
        const retorno = await this.conexion.executeProcedure('insert_usuario', [
            datos.nombres,
            datos.apellidos,
            datos.correo,
            datos.clave,
            rol
        ]);
        console.log(retorno);
        if (!retorno) throw new HttpException('Error al registrar el usuario', 400);
        return retorno;
    }

    async registrarProfesional(datos: ProfesionalDto) {
        if (datos.rol != "entrenador" && datos.rol != "nutricionista") throw new HttpException('Rol incorrecto', 400);
        const id = await this.registrarUsuario(datos, datos.rol);
        console.log(id);
        if (!id || id == null) throw new HttpException('Error al registrar', 400);
        const retorno = await this.conexion.executeProcedure('insert_profesional', [id, datos.descripcion,datos.links]);
        if(!retorno) throw new HttpException('Error al registrar el profesional', 400);
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
        return { mensaje: "Cliente registrado correctamente" };
    }

    async login(datos: usuarioDto) {
        const retorno = await this.conexion.executeProcedure('login', [datos.correo]);
        if (retorno.clave == undefined) throw new HttpException('Usuario no existe', 400);
        const valido = await compare(datos.clave, retorno.clave);
        if (!valido) throw new HttpException('Clave incorrecta', 400);
        const token_id = this.jwt.sign({ id: retorno.id.toString().trim(), email: retorno.correo.toString().trim(), rol: [retorno.rol.toString().trim()] });
        //* Para verificar el token, se debe envíar por medio del auth bearer el token
        return { "mensaje": "Usuario logueado correctamente", token_id };
    }

    // TODO: Reubicar esta funcion en un servicio aparte
    async obtenerPerfil(correo: string) {
        const retorno = (await this.conexion.executeProcedure('obtener_cliente', [correo]));
        if (!retorno) throw new HttpException('Usuario no existe', 500);
        return {
            "nombres": retorno.nombres.toString().trim(),
            "apellidos": retorno.apellidos.toString().trim(),
            "correo": retorno.correo.toString().trim(),
        };
    }
}
