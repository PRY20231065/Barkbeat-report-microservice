import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class HistoricTempRequestDTO {
    
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    dog_id: string;

    @ApiProperty()
    @IsNumber()
    @AutoMap()
    temp: number;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    created_time: number;
}