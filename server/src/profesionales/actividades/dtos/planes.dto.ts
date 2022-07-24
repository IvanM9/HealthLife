/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty()
    estado: boolean;
    @ApiProperty()
    objetivos: string;
    @ApiProperty({isArray: true, type: Actividades})
    actividades: Actividades[];


}