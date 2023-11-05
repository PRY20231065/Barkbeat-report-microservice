import { AutoMap } from "@automapper/classes";

export class HistoricTemperatureKey {
    @AutoMap()
    dog_id: string;
}

export class HistoricTemperature extends HistoricTemperatureKey {
    @AutoMap()
    id: string

    @AutoMap()
    temp: number

    @AutoMap()
    created_time: number;
}