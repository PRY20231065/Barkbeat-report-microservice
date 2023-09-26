import { HistoricEcg } from "../model/historicECG.model";

export interface HistoricEcgRepository{
    create(historic: HistoricEcg): Promise<HistoricEcg>;
}