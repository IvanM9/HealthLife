/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';

@Injectable()
export class SuscripcionesService {
    constructor(private conexion:ConexionService){}

    async obtenerPlanesGenerales(){
        try {
            const retorno = await this.conexion.executeProcedure('get_planes_generales', null);
            if(retorno == null){
                throw new HttpException('No se encontraron planes', 404);
            }
            return retorno;
            
        } catch (error) {
            throw new HttpException("Erorr: "+error, 500)
        }
    }

    async suscribirse(id_usuario:number, id_plan:number){
        try {
            const retorno = await this.conexion.executeProcedure('suscribirse', [id_plan,id_usuario]);
            if(retorno == null){
                throw new HttpException('No se pudo suscribir', 404);
            }
            return retorno;
        } catch (error) {
            throw new HttpException("Erorr: "+error, 500)
        }
    }
}
