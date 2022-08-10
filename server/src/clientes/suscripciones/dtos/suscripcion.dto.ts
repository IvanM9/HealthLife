/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber } from "class-validator";

export class SuscripcionDto {
    @ApiProperty()
    @IsNumber()
    id_plan: number;
}

export class ModificarSuscripcionDto extends SuscripcionDto{
    @ApiProperty()
    @IsBoolean()
    activo: boolean;
}