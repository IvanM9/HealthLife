/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsObject, IsString, isURL, IsUrl, ValidateNested } from "class-validator";
import { usuarioDto } from "./usuario.dto";

class links {
    @ApiProperty()
    @IsUrl()
    link: string;
}
export class ProfesionalDto extends usuarioDto {
    @ApiProperty()
    readonly descripcion: string;
    @ApiProperty({ isArray: true, type: IsUrl() })
    // @ValidateNested({ each: true })
    // @Type(() => links)
    links: string[];
    @ApiProperty({ examples: ['entrenador', 'nutricionista'] })
    @IsString()
    readonly rol: string;
}

