import { Injectable } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';
import { SortOrder } from "dynamoose/dist/General";
import { HistoricTemperature, HistoricTemperatureKey } from "./domain/model/historicTemp.model";

@Injectable()
export class HistoricTemperatureImplRepository {
    constructor(
        @InjectModel('historic_temperature')
        private readonly historicTemperatureModel: Model<HistoricTemperature, HistoricTemperatureKey>
    ) { }
    
    
    async create(historic: HistoricTemperature): Promise<HistoricTemperature> {
        historic.id = uuid.v4();
        
        const historicCreated = await this.historicTemperatureModel.create(historic);
        return historicCreated;
    }

    async getRegistriesByTimes(dogId: string, timestampStart: number, timestampEnd: number): Promise<any[]>{
        const query = this.historicTemperatureModel.query('dog_id').eq(dogId);

        query.where('created_time').between(timestampStart, timestampEnd);

        const result = await query.exec();

        return result;
    }


    async getRegistryLast5minutesTemp(dogId: string): Promise<any[]> {
        const result = await this.historicTemperatureModel.query('dog_id')
            .eq(dogId)
            .sort(SortOrder.descending)
            .exec();

        if (result.length > 0) {
            // Obtiene el "created_time" del registro más reciente.
            const timestampEnd = result[0].created_time;

            // Resta 5 minutos (300 segundos) para obtener el "timestampStart".
            const timestampStart = timestampEnd - 300 * 1000;

            const query = this.historicTemperatureModel.query('dog_id').eq(dogId);

            query.where('created_time').between(timestampStart, timestampEnd);

            const resultFinal = await query.exec();

            return resultFinal;

        } else {
            // En caso de que no se encuentre ningún registro, retorna un arreglo vacío o maneja la lógica según tus necesidades.
            return [];
        }
    }

}