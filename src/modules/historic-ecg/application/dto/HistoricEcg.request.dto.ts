import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ECG } from "../../domain/model/historicECG.model";
import { ApiProperty } from "@nestjs/swagger";

export class HistoricEcgRequestDTO {
    
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    dog_id: string;

    @ApiProperty()
    @AutoMap()
    ecg: [];

    @ApiProperty()
    @AutoMap()
    @IsNumber()
    created_time: number;
}