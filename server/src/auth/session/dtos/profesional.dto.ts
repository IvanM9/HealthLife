/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { usuarioDto } from "./usuario.dto";

export class ProfesionalDto extends usuarioDto {
    @ApiProperty()
    readonly descripcion: string;
    @ApiProperty({isArray:true, type:String})
    readonly links: string[];
    @ApiProperty({examples:['entrenador','nutricionista']})
    @IsString()
    readonly rol: string;
}