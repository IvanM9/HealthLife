/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { ConexionService } from 'src/conexion/conexion.service';
import { IMC } from '../IMC';

@Injectable()
export class PerfilService {
    constructor(private conexion:ConexionService) {}

    async obtenerIMC(id:number){
        const datos = await this.obtenerDatosPerfil(id);
        if(!datos) throw new HttpException("Erorr en obtener los datos",500);
        const imc = new IMC(datos.talla, datos.peso)
        return{
            imc: imc.calcularIMC(),
            info: imc.informacion()
        };

    }

    async obtenerDatosPerfil(id:number){
        const retorno = await this.conexion.executeProcedure('get_cliente',[id])
        if(!retorno) throw new HttpException('No se pudo obtener los datos del cliente', 500);
        return retorno;
    }
}
