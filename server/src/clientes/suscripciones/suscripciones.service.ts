/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { IMC } from '../IMC';
import { ModificarSuscripcionDto } from './dtos/suscripcion.dto';
import * as momentt from 'moment-timezone'

@Injectable()
export class SuscripcionesService {

    private tiempo: any = momentt.tz('America/Guayaquil');
    constructor(private conexion: ConexionService) { }

    private verificarRespuesta(respuesta: any): any {
        const aux = respuesta.length != undefined && respuesta.length > 0;
        if (!aux && Object.keys(respuesta).length <= 0) return null;
        if (!aux) return [respuesta]
        return respuesta;
    }

    async obtenerPlanesGenerales(tipo: number) {
        try {
            const retorno = await this.conexion.executeProcedure('get_planes_generales', [tipo]);
            const aux = this.verificarRespuesta(retorno)
            if (aux == null) {
                throw new HttpException('No se encontraron planes', 400);
            }
            return aux;

        } catch (error) {
            throw new HttpException("Erorr: " + error, 500)
        }
    }

    async suscribirse(id_usuario: number, id_plan: number) {
        try {
            // console.log();
            console.log();
            const retorno = await this.conexion.executeProcedure('suscribirse', [id_plan, id_usuario, this.tiempo.format('YYYY-MM-DD')]);
            if (retorno == false) {
                throw new HttpException('No se pudo suscribir', 400);
            }
            return retorno;
        } catch (error) {
            throw new HttpException(error, 500)
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
            const imc = new IMC(datos.talla, datos.peso);
            const retorno = await this.conexion.executeProcedure('get_planes_recomendados', [imc.calcularIMC()]);
            const aux = this.verificarRespuesta(retorno)
            if (aux == null) throw new HttpException('No hay planes recomendados', 400)
            return aux;
        } catch (error) {
            throw new HttpException("Erorr: " + error, 500)
        }
    }

    async planesSuscritos(id: number) {
        try {
            const datos = await this.conexion.executeProcedure('get_planes_suscritos', [id]);
            const aux = this.verificarRespuesta(datos);
            console.log(aux)
            if (aux == null)
                throw new HttpException('No hay planes suscritos', 400)
            return aux;
        }
        catch (error) {
            return error;
        }
    }

    async obtenerActividadesSuscritasPorDia(idplan: number, idcliente: number) {
        try {
            console.log(this.tiempo.day())
            const retorno = await this.conexion.executeProcedure("get_actividades_por_dia", [idplan, idcliente, this.tiempo.day()]);
            const aux = this.verificarRespuesta(retorno);
            if (aux == null) throw new HttpException("No hay actividades para hoy", 400);
            return aux;
        } catch (error) {
            throw new HttpException(error, 500)
        }
    }
}
