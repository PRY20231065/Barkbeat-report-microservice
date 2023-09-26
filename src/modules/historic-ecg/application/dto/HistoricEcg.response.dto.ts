import { AutoMap } from "@automapper/classes";
import { ECG } from "../../domain/model/historicECG.model";

export class HistoricEcgResponseDTO {
    
    @AutoMap()
    id: string;
    
    @AutoMap()
    dog_id: string;

    @AutoMap()
    ecg: Array<ECG>;

    @AutoMap()
    created_time: number;
}