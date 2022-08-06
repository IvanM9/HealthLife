/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { PlanesDto, UpdatePlanesDto } from './dtos/planes.dto';

@Injectable()
export class ActividadesService {

    constructor(private conexion: ConexionService) { }

    async obtenerPlan(idProfesional: number) {
        try {
            const resultado = await this.conexion.executeProcedure("get_planes", [idProfesional]);
            if (!resultado || resultado == null) throw new HttpException("No se pudo obtener los planes", 500);
            return resultado;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async obtenerActividades(idPlan: number) {
        try {
            const resultado = await this.conexion.executeProcedure("get_actividades", [idPlan]);
            if (!resultado || resultado == null) throw new HttpException("No se pudo obtener las actividades", 500);
            return resultado;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async crearPlan(planes: PlanesDto, idProfesional: number) {
        try {
            const indice = await this.conexion.executeProcedure("insert_plan", [planes.nombre, idProfesional, planes.estado, planes.objetivos]);
            if (indice == -1 || indice == null) throw new HttpException("No se pudo crear el plan", 500);
            const aux: string[] = [];
            for (const element of planes.actividades) {
                const insertado = await this.conexion.executeProcedure("insert_actividad", [element.titulo, element.dia, element.detalles, indice]);
                if (!insertado || insertado == null)
                    aux.push(element.titulo);
            }
            if (aux.length > 0) throw new HttpException(`No se pudieron crear las actividades: ${aux}`, 400);
            return { mensaje: "Plan creado correctamente" };
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async obtenerProfesionales() {
        try {
            const retorno = await this.conexion.executeProcedure("get_profesionales",null);
            if (retorno.length <= 0 || retorno == null) throw new HttpException("No se pudo obtener los profesionales", 500);
            return retorno;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async modificarPlan(plan:UpdatePlanesDto, id:number){
        try {
            const retorno = await this.conexion.executeProcedure("update_plan", [ id, plan.nombre, plan.estado, plan.objetivos]);
            if (!retorno) throw new HttpException("Error al modificar el plan", 500);
            return { mensaje: "Plan modificado correctamente" };
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }
}
