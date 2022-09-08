/* eslint-disable prettier/prettier */
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsInt, IsNumber, IsPositive, IsString, Max, Min, MinLength, ValidateNested} from "class-validator";
class Actividades {
    @ApiProperty()
    @IsString()
    @MinLength(5)
    titulo: string;
    @ApiProperty()
    @IsInt()
    @IsPositive()
    @Max(7)
    @Min(1)
    dia: number;
    @ApiProperty()
    @IsString()
    detalles: string;
}
export class PlanesDto {
    @ApiProperty()
    @IsString()
    nombre: string;
    @ApiProperty({default: false, description: "Si es verdadero, será plan general"})
    publico: boolean;
    @ApiProperty({default:true, description:'Si es verdadero, el plan está visible para los clientes, sino, está oculto'})
    estado: boolean;
    @ApiProperty()
    @IsString()
    objetivos: string;
    @ApiProperty()
    @IsPositive()
    @Max(100)
    @Min(5)
    edad:number;
    @ApiProperty({isArray: true, type: "string"})
    etiquetas: string[];
    @IsNumber()
    @IsPositive()
    @Max(40)
    @Min(15)
    @ApiProperty({default:"16"})
    IMC: number;
    @ApiProperty()
    enfermedades:string;
    @ApiProperty({isArray: true, type: Actividades})
    @ValidateNested()
    actividades: Actividades[];
}

export class UpdatePlanesDto extends OmitType(PlanesDto, ['actividades']) {
    
}
