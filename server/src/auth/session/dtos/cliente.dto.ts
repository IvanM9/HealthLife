/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { usuarioDto } from "./usuario.dto";

export class ClienteDto extends usuarioDto {
    @ApiProperty()
    @IsString()
    talla: string;

    @ApiProperty()
    @IsString()
    peso: string;

    @ApiProperty()
    @IsString()
    habitos: string;

    @ApiProperty()
    alergias: string;

    @ApiProperty()
    enfermedades: string;

    @ApiProperty()
    detalles_extras: string;
}