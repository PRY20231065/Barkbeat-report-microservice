import { AutoMap } from "@automapper/classes";

export class HistoricPulseResponseDTO {
    
    @AutoMap()
    id: string;
    
    @AutoMap()
    dog_id: string;

    @AutoMap()
    avg: number;

    @AutoMap()
    beats_per_minute: number

    @AutoMap()
    created_time: number;
}