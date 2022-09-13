/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/swagger";
import { ClienteDto } from "src/auth/session/dtos/cliente.dto";

export class UpdateClienteDto extends OmitType(ClienteDto,['clave','correo','sexo']){
}