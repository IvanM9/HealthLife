/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { ConexionService } from 'src/conexion/conexion.service';
import { IMC } from '../IMC';
import { UpdateClienteDto } from './dtos/UpdateCliente.dto';

@Injectable()
export class PerfilService {
    constructor(private conexion:ConexionService) {}

    async obtenerIMC(talla:number, peso:number){
        if(!talla && !peso) throw new HttpException("Erorr en obtener los datos",500);
        const imc = new IMC(talla, peso)
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

    async modificarPerfil(id:number, datos:UpdateClienteDto, correo:string){
        const user = await this.conexion.executeProcedure("login",[correo]);
        if(user==null) throw new HttpException("Error en obtener el usuario", 500);
        const retorno = await this.conexion.executeProcedure("update_cliente",[
            id,
            datos.habitos,
            datos.alergias,
            datos.enfermedades,
            datos.detalles_extras,
            datos.talla,
            datos.peso,
            user.id_usuario,
            datos.nombres,
            datos.apellidos
        ])
        if(!retorno || retorno == null) throw new HttpException("Error al modificar los datos", 500);
        return retorno;
    }
}
