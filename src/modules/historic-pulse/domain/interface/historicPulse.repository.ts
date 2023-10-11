import { HistoricPulse } from "../model/historicPulse.model";

export interface HistoricPulseRepository{
    create(historic: HistoricPulse): Promise<HistoricPulse>;
}