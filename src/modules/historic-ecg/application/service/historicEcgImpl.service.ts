/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { HistoricEcgService } from '../../domain/interface/historicECG.service';
import { IGenericResponse } from 'src/utils/generic';
import { HistoricEcgRequestDTO } from '../dto/HistoricEcg.request.dto';
import { HistoricEcgResponseDTO } from '../dto/HistoricEcg.response.dto';
import { HistoricEcgImplRepository } from '../../infrastructure/repository/historicECGImpl.repository';
import { mapper } from 'src/utils/mapping/mapper';
import { HistoricEcg } from '../../domain/model/historicECG.model';
import { ErrorManager } from 'src/utils/errors/error.manager';

@Injectable()
export class HistoricEcgImplService implements HistoricEcgService {
    constructor(
        private readonly historicRepository: HistoricEcgImplRepository
    ){}

    async create(historicReq: HistoricEcgRequestDTO): Promise<IGenericResponse<HistoricEcgResponseDTO>> {
        try {

            
            const historicModel = mapper.map(historicReq, HistoricEcgRequestDTO, HistoricEcg);
            historicModel.ecg = historicReq.ecg;

            const responseHistoric = await this.historicRepository.create(historicModel);

            if (!responseHistoric) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Registry of Historic ECG for dog not was created`
                })
            }

            const mapHistoric = mapper.map(responseHistoric, HistoricEcg, HistoricEcgResponseDTO);
            mapHistoric.ecg = responseHistoric.ecg;

            return {
                success: true,
                data: mapHistoric,
                messages: ['Registry of Historic ECG for dog successfull created'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async getEcgRegistryByTimes(dogId: string, timestampStart: number, timestampEnd: number): Promise<any[]>{
        try{
            const ecgs = await this.historicRepository.getRegistriesByTimes(dogId, timestampStart, timestampEnd);
            return ecgs;
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async getRegistryLast5minutes(dogId: string): Promise<any[]>{
        try{
            const ecgs = await this.historicRepository.getRegistryLast5minutesECG(dogId);
            return ecgs;
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
