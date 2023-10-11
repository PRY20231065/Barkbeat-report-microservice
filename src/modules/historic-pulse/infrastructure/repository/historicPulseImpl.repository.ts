import { Injectable } from "@nestjs/common";
import { HistoricPulseRepository } from "../../domain/interface/historicPulse.repository";
import { HistoricPulse, HistoricPulseKey } from "../../domain/model/historicPulse.model";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';

@Injectable()
export class HistoricPulseImplRepository implements HistoricPulseRepository {
    constructor(
        @InjectModel('historic_pulse')
        private readonly historicPulseModel: Model<HistoricPulse, HistoricPulseKey>
    ) { }
    
    
    async create(historic: HistoricPulse): Promise<HistoricPulse> {
        historic.id = uuid.v4();
        
        const historicCreated = await this.historicPulseModel.create(historic);
        return historicCreated;
    }

    async getRegistriesByTimes(dogId: string, timestampStart: number, timestampEnd: number): Promise<any[]>{
        const query = this.historicPulseModel.query('dog_id').eq(dogId);

        query.where('created_time').between(timestampStart, timestampEnd);

        //query.attributes(['ecg']);

        const result = await query.exec();

        return result;
    }

}