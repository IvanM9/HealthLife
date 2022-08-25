/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsDecimal, IsPositive} from "class-validator";
class Actividades {
    @ApiProperty()
    titulo: string;
    @IsPositive()
    @ApiProperty()
    dia: number;
    @ApiProperty()
    detalles: string;
}
export class PlanesDto {
    @ApiProperty()
    nombre: string;
    @ApiProperty({default: false, description: "Si es verdadero, será plan general"})
    publico: boolean;
    @ApiProperty({default:true, description:'Si es verdadero, el plan está visible para los clientes, sino, está oculto'})
    estado: boolean;
    @ApiProperty()
    objetivos: string;
    @ApiProperty()
    edad:number;
    @ApiProperty({isArray: true, type: "string"})
    etiquetas: string[];
    @IsDecimal()
    @ApiProperty({default:"0.0"})
    IMC: string;
    @ApiProperty()
    enfermedades:string;
    @ApiProperty({isArray: true, type: Actividades})
    actividades: Actividades[];
}

export class UpdatePlanesDto extends OmitType(PlanesDto, ['actividades']) {
    
}
