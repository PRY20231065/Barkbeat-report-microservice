import { AutoMap } from "@automapper/classes";

export class ReportKey {
    @AutoMap()
    id: string;
}

export class Report extends ReportKey {
    
    @AutoMap()
    dog_id: string

    @AutoMap()
    owner_id: string

    @AutoMap()
    veterinarian_id: string;

    @AutoMap()
    description: string;

    @AutoMap()
    indications: [];

    @AutoMap()
    created_date: number;
    //symptoms: [];
}