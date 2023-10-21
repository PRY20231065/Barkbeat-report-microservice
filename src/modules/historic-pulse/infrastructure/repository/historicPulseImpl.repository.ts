import { Injectable } from "@nestjs/common";
import { HistoricPulseRepository } from "../../domain/interface/historicPulse.repository";
import { HistoricPulse, HistoricPulseKey } from "../../domain/model/historicPulse.model";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';
import { SortOrder } from "dynamoose/dist/General";

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


    async getRegistryLast5minutesPulse(dogId: string): Promise<any[]> {
        const result = await this.historicPulseModel.query('dog_id')
            .eq(dogId)
            .sort(SortOrder.descending)
            .exec();

        if (result.length > 0) {
            // Obtiene el "created_time" del registro más reciente.
            const timestampEnd = result[0].created_time;

            // Resta 5 minutos (300 segundos) para obtener el "timestampStart".
            const timestampStart = timestampEnd - 300 * 1000;

            const query = this.historicPulseModel.query('dog_id').eq(dogId);

            query.where('created_time').between(timestampStart, timestampEnd);

            const resultFinal = await query.exec();

            return resultFinal;

        } else {
            // En caso de que no se encuentre ningún registro, retorna un arreglo vacío o maneja la lógica según tus necesidades.
            return [];
        }
    }

}