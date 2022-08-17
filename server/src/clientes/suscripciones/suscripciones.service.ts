/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { IMC } from '../IMC';
import { ModificarSuscripcionDto } from './dtos/suscripcion.dto';

@Injectable()
export class SuscripcionesService {
    constructor(private conexion: ConexionService) { }

    async obtenerPlanesGenerales() {
        try {
            const retorno = await this.conexion.executeProcedure('get_planes_generales', null);
            if (retorno == null) {
                throw new HttpException('No se encontraron planes', 400);
            }
            return retorno;

        } catch (error) {
            throw new HttpException("Erorr: " + error, 500)
        }
    }

    async suscribirse(id_usuario: number, id_plan: number) {
        try {
            const retorno = await this.conexion.executeProcedure('suscribirse', [id_plan, id_usuario]);
            if (retorno == null) {
                throw new HttpException('No se pudo suscribir', 400);
            }
            return retorno;
        } catch (error) {
            throw new HttpException("Erorr: " + error, 500)
        }
    }

    async modificar_suscripcion(id_usuario: number, suscripcion: ModificarSuscripcionDto) {
        try {
            const retorno = await this.conexion.executeProcedure('update_activo_suscripcion', [suscripcion.id_plan, id_usuario, suscripcion.activo]);
            if (!retorno || retorno == null) {
                throw new HttpException('No se pudo modificar', 400);
            }
            return { mensaje: 'Suscripcion modificada' };
        } catch (error) {
            throw new HttpException("Erorr: " + error, 500)
        }
    }

    async obtenerPlanesRecomendados(id: number) {
        try {
            const datos = await this.conexion.executeProcedure('get_cliente', [id]);
            if (!datos || datos == null) throw new HttpException('Error al cargar los datos del cliente', 500);
            const imc = new IMC(datos.altura, datos.peso);
            const retorno = await this.conexion.executeProcedure('get_planes_recomendados', [imc.calcularIMC()]);
            if (retorno[0].id == undefined || !retorno) throw new HttpException('No se encontraron planes', 400);
            return retorno;
        } catch (error) {
            throw new HttpException("Erorr: " + error, 500)
        }
    }
}
