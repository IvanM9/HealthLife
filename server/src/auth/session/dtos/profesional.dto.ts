/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { usuarioDto } from "./usuario.dto";

export class ProfesionalDto extends usuarioDto {
    @ApiProperty()
    readonly descripcion: string;
    @ApiProperty()
    readonly links: string[];
    @ApiProperty()
    @IsString()
    readonly rol: string;
}