/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { UpdateProfesionalDto } from './dtos/updateProfesional.Dto';

@Injectable()
export class PerfilService {
    constructor(private conexion: ConexionService) { }

    async obtenerPerfil(id: number) {
        try {
            const retorno = await this.conexion.executeProcedure("get_profesional", [id]);
            if (retorno.length <= 0)
                throw new HttpException("No se encuentran datos del profesional", 400)
            return retorno;
        } catch (error) {
            throw new HttpException(error, 500)
        }
    }

    async modificarPerfil(id: number, datos: UpdateProfesionalDto, correo: string) {
        const usuario = await this.conexion.executeProcedure('login', [correo])
        console.log(usuario)
        console.log(datos)
        if (usuario == null) throw new HttpException("No existe el usuario", 500);
        const retorno = await this.conexion.executeProcedure('update_profesional', [
            id,
            datos.descripcion,
            datos.links,
            usuario.id_usuario,
            datos.nombres,
            datos.apellidos
        ]);
        if (!retorno || retorno == null) throw new HttpException("No se ha podido modificar el profesional", 500);
        return retorno;
    }
}
