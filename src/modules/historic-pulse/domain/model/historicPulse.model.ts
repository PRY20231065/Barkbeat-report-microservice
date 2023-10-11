import { AutoMap } from "@automapper/classes";

export class HistoricPulseKey {
    @AutoMap()
    dog_id: string;
}

export class HistoricPulse extends HistoricPulseKey {
    @AutoMap()
    id: string

    @AutoMap()
    beats_per_minute: number

    @AutoMap()
    avg: number

    @AutoMap()
    created_time: number;
}