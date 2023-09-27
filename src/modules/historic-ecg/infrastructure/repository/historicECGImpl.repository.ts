import { Injectable } from "@nestjs/common";
import { HistoricEcgRepository } from "../../domain/interface/historicECG.repository";
import { HistoricEcg, HistoricEcgKey } from "../../domain/model/historicECG.model";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';

@Injectable()
export class HistoricEcgImplRepository implements HistoricEcgRepository {
    constructor(
        @InjectModel('historic_ecg')
        private readonly historicEcgModel: Model<HistoricEcg, HistoricEcgKey>
    ) { }
    
    
    async create(historic: HistoricEcg): Promise<HistoricEcg> {
        historic.id = uuid.v4();
        
        const historicCreated = await this.historicEcgModel.create(historic);
        return historicCreated;
    }

}