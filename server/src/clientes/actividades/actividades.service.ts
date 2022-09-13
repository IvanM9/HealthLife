/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { RegistrosDto, UpdateRegistroDto } from './Dtos/registros.dto';
import * as moment from 'moment'
import { ModificarSuscripcionDto } from '../suscripciones/dtos/suscripcion.dto';

@Injectable()
export class ActividadesService {
    constructor(private conexion: ConexionService) { }

    async registrarActividadRealizada(idcliente: number, registro: RegistrosDto) {
        try {
            const retorno = await this.conexion.executeProcedure("update_registro_actividades", [
                idcliente,
                registro.idActividad,
                registro.realizado,
                moment().format("YYYY-MM-DD")
            ]);
            if(!retorno) throw new HttpException("No se ha podido guardar el registro", 400)
            return retorno;
        } catch (error) {
            return error;
        }
    }

    async mostrarActividadesRealizadas(idcliente:number, idplan:number){
        try {
            const retorno = await this.conexion.executeProcedure("get_registros",[idcliente, idplan])
            if(retorno.length <= 0) throw new HttpException("No hay actividades realizadas", 400)
            return retorno;
        } catch (error) {
            return error;
        }
    }

    async actualizarActividadesRealizadas(id:number, realizado:UpdateRegistroDto){
        try {
            const retorno = await this.conexion.executeProcedure("update_registro_actividades",[id,realizado.realizado]);
            if(!retorno) throw new HttpException("No se ha podido cambiar", 400)
            return retorno ;
        } catch (error) {
            return error;
        }
    }
}
