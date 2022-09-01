/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class RegistrosDto{
    @ApiProperty()
    @IsNumber()
    idActividad: number;

    @ApiProperty()
    @IsBoolean()
    realizado: boolean;
}

export class UpdateRegistroDto extends OmitType(RegistrosDto,['idActividad']){}