/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SuscripcionDto {
    @ApiProperty()
    @IsNumber()
    id_plan: number;
}