/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType } from "@nestjs/swagger";
class Actividades {
    @ApiProperty()
    titulo: string;
    @ApiProperty()
    dia: string;
    @ApiProperty()
    detalles: string;
}
export class PlanesDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty({default: false})
    publico: boolean;
    @ApiProperty()
    objetivos: string;
    @ApiProperty({isArray: true, type: Actividades})
    actividades: Actividades[];
}

export class UpdatePlanesDto extends OmitType(PlanesDto, ['actividades']) {
}
