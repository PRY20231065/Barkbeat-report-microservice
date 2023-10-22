import { AutoMap } from "@automapper/classes";

export class ReportResponseDTO {

    @AutoMap()
    id: string;

    @AutoMap()
    owner_id: string;

    @AutoMap()
    dog_id: string;

    @AutoMap()
    veterinarian_id: string;

    @AutoMap()
    description: string;

    @AutoMap()
    indications: []

    @AutoMap()
    created_date: number;
}