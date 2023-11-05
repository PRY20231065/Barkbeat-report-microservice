import { AutoMap } from "@automapper/classes";

export class HistoricTempResponseDTO {
    
    @AutoMap()
    id: string;
    
    @AutoMap()
    dog_id: string;

    @AutoMap()
    temp: number;

    @AutoMap()
    created_time: number;
}