/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { PlanesDto } from './dtos/planes.dto';

@Injectable()
export class ActividadesService {

    constructor(private conexion: ConexionService) { }

    async obtenerPlanesCreados(idProfesional: number) {
        try {
            await this.conexion.executeProcedure("getPlanes", [idProfesional]);
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async crearPlan(planes: PlanesDto, idProfesional: number) {
        try {
            console.log(planes);
            const indice = await this.conexion.executeProcedure("insert_plan", [planes.nombre, idProfesional, planes.estado, planes.objetivos]);
            console.log(indice);
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
}
