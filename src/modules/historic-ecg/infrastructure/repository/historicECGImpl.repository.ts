import { Injectable } from "@nestjs/common";
import { HistoricEcgRepository } from "../../domain/interface/historicECG.repository";
import { HistoricEcg, HistoricEcgKey } from "../../domain/model/historicECG.model";
import { InjectModel, Model } from "nestjs-dynamoose";
import * as uuid from 'uuid';
import { SortOrder } from "dynamoose/dist/General";

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

    async getRegistriesByTimes(dogId: string, timestampStart: number, timestampEnd: number): Promise<any[]> {
        const query = this.historicEcgModel.query('dog_id').eq(dogId);

        query.where('created_time').between(timestampStart, timestampEnd);

        query.attributes(['ecg']);

        const result = await query.exec();

        return result.map((obj) => obj.ecg).flat();;
    }

    async getRegistryLast5minutesECG(dogId: string): Promise<any[]> {
        const result = await this.historicEcgModel.query('dog_id')
            .eq(dogId)
            .sort(SortOrder.descending)
            .exec();

        if (result.length > 0) {
            // Obtiene el "created_time" del registro más reciente.
            const timestampEnd = result[0].created_time;

            // Resta 5 minutos (300 segundos) para obtener el "timestampStart".
            const timestampStart = timestampEnd - 300 * 1000;

            const query = this.historicEcgModel.query('dog_id').eq(dogId);

            query.where('created_time').between(timestampStart, timestampEnd);

            query.attributes(['ecg']);

            const resultFinal = await query.exec();

            return resultFinal.map((obj) => obj.ecg).flat();

        } else {
            // En caso de que no se encuentre ningún registro, retorna un arreglo vacío o maneja la lógica según tus necesidades.
            return [];
        }
    }

}