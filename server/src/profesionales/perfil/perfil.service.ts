/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';

@Injectable()
export class PerfilService {
    constructor(private conexion:ConexionService){}

    async obtenerPerfil(id:number){
        try {
            const retorno = await this.conexion.executeProcedure("get_profesional",[id]);
            if(retorno.length <=0 )
                throw new HttpException("No se encuentran datos del profesional",400)
            return retorno;
        } catch (error) {
            throw new HttpException(error,500)
        }
    }
}
