import { AutoMap } from "@automapper/classes";

export class HistoricEcgKey {
    @AutoMap()
    dog_id: string;
}

export class HistoricEcg extends HistoricEcgKey {
    @AutoMap()
    id: string

    @AutoMap()
    ecg: Array<ECG>

    @AutoMap()
    created_time: number;
}

export interface ECG {
    value:     number;
    timestamp: number;
}