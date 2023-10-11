import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class HistoricPulseRequestDTO {
    
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    dog_id: string;

    @ApiProperty()
    @IsNumber()
    @AutoMap()
    beats_per_minute: number;

    @ApiProperty()
    @IsNumber()
    @AutoMap()
    avg: number;

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    created_time: number;
}