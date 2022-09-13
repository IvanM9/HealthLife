/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { Actividades, PlanesDto, UpdatePlanesDto } from './dtos/planes.dto';

@Injectable()
export class ActividadesService {

    constructor(private conexion: ConexionService) { }

    private verificarRespuesta(respuesta: any): any {
        const aux = respuesta.length != undefined && respuesta.length > 0;
        if (!aux && Object.keys(respuesta).length <= 0) return null;
        if (!aux) return [respuesta]
        return respuesta;
    }
    async obtenerPlan(idProfesional: number) {
        try {
            const resultado = await this.conexion.executeProcedure("get_planes", [idProfesional]);
            const respuesta = this.verificarRespuesta(resultado);
            if (respuesta == null) throw new HttpException("No hay planes", 400)
            return respuesta;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }



    async obtenerActividades(idPlan: number) {
        try {
            const resultado = await this.conexion.executeProcedure("get_actividades", [idPlan]);
            const respuesta = this.verificarRespuesta(resultado);
            if (respuesta == null) throw new HttpException("No se pudo obtener las actividades", 500);
            return respuesta;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async crearPlan(planes: PlanesDto, idProfesional: number) {
        try {
            let auxTags = "{";
            for (const elements of planes.etiquetas) {
                auxTags += elements + ","
            }

            auxTags = auxTags.slice(0, auxTags.lastIndexOf(",")) + "}";
            const indice = await this.conexion.executeProcedure("insert_plan", [
                planes.nombre,
                idProfesional,
                planes.estado,
                planes.objetivos,
                planes.edad,
                planes.IMC,
                planes.enfermedades,
                auxTags,
                planes.publico]);
            if (indice == -1 || indice == null) throw new HttpException("No se pudo crear el plan", 400);
            const aux: string[] = [];
            for (const element of planes.actividades) {
                if (element.dia > 7 || element.dia <= 0) {
                    aux.push(element.titulo);
                } else {
                    const insertado = await this.nuevaActividad(element, indice)
                    if (!insertado || insertado == null)
                        aux.push(element.titulo);
                }
            }
            if (aux.length > 0) throw new HttpException(`No se pudieron crear las actividades: ${aux}`, 400);
            return { mensaje: "Plan creado correctamente" };
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async obtenerProfesionales() {
        try {
            const retorno = await this.conexion.executeProcedure("get_profesionales", null);
            const aux = this.verificarRespuesta(retorno);
            if (aux == null) throw new HttpException("No se pudo obtener los profesionales", 500);
            return aux;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async modificarPlan(plan: UpdatePlanesDto, id: number) {
        try {
            const retorno = await this.conexion.executeProcedure("update_plan", [id, plan.nombre, plan.estado, plan.publico, plan.objetivos]);
            if (!retorno) throw new HttpException("Error al modificar el plan", 400);
            return { mensaje: "Plan modificado correctamente" };
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async obtenerClientesSuscritos(id: number) {
        try {
            const retorno = await this.conexion.executeProcedure("get_clientes_suscritos", [id]);
            const aux = this.verificarRespuesta(retorno);
            if (aux == null) throw new HttpException("No se pudo obtener los clientes", 500);
            console.log(aux);
            return aux;
        } catch (error) {
            throw new HttpException(error, 500);
        }
    }

    async eliminarActividad(id: number) {
        const retorno = await this.conexion.executeProcedure("delete_actividad", [id])
        if (!retorno || retorno == null) throw new HttpException("No se pudo eliminar la actividad", 500)
        return retorno;
    }

    private async nuevaActividad(element: Actividades, idplan: number) {
        return await this.conexion.executeProcedure("insert_actividad", [element.titulo, element.dia, element.detalles, idplan]);
    }

    async crearNuevaActividad(actividades: Actividades[], idplan: number) {
        const aux = []
        actividades.forEach(element => {
            const retorno = this.nuevaActividad(element, idplan)
            if (!retorno || retorno == null)
                aux.push(element.titulo)
        });
        if (aux.length > 0) throw new HttpException("No se han podido insertar las siguientes actividades: " + aux.join(','), 400)
        return {'mensaje':'Actividades insertadas correctamente'}

    }
}
