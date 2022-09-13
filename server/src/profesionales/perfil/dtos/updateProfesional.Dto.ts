/* eslint-disable prettier/prettier */
import { OmitType } from "@nestjs/swagger";
import { ProfesionalDto } from "src/auth/session/dtos/profesional.dto";

export class UpdateProfesionalDto extends OmitType(ProfesionalDto,['clave', 'correo', 'rol','sexo']){

}