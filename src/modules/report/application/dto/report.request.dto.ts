import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ReportRequestDTO {
    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    owner_id: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    dog_id: string;

    @ApiProperty()
    @AutoMap()
    @IsNotEmpty()
    veterinarian_id: string;

    @ApiProperty()
    @AutoMap()
    description: string;

    @ApiProperty()
    @AutoMap()
    indications: []

    @ApiProperty()
    @AutoMap()
    symptons: []
}