/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsString } from "class-validator";
import { usuarioDto } from "./usuario.dto";

export class ClienteDto extends usuarioDto {
    @ApiProperty({example:'1.70', description:'Talla en metros (m)'})
    @IsDecimal({maxDecimalPlaces:2})
    talla: number;

    @ApiProperty({example:'70.00', description:'Peso en kilogramos (kg)'})
    @IsDecimal({maxDecimalPlaces:2})
    peso: number;

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