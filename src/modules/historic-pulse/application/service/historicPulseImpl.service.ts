/*
https://docs.nestjs.com/providers#services
*/

import { HttpStatus, Injectable } from '@nestjs/common';
import { HistoricPulseService } from '../../domain/interface/historicPulse.service';
import { IGenericResponse } from 'src/utils/generic';
import { HistoricPulseRequestDTO } from '../dto/HistoricPulse.request.dto';
import { HistoricPulseResponseDTO } from '../dto/HistoricPulse.response.dto';
import { HistoricPulseImplRepository } from '../../infrastructure/repository/historicPulseImpl.repository';
import { mapper } from 'src/utils/mapping/mapper';
import { HistoricPulse } from '../../domain/model/historicPulse.model';
import { ErrorManager } from 'src/utils/errors/error.manager';

@Injectable()
export class HistoricPulseImplService implements HistoricPulseService {
    constructor(
        private readonly historicRepository: HistoricPulseImplRepository
    ){}

    async create(historicReq: HistoricPulseRequestDTO): Promise<IGenericResponse<HistoricPulseResponseDTO>> {
        try {
            const historicModel = mapper.map(historicReq, HistoricPulseRequestDTO, HistoricPulse);

            const responseHistoric = await this.historicRepository.create(historicModel);

            if (!responseHistoric) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Registry of Historic Pulse for dog not was created`
                })
            }

            const mapHistoric = mapper.map(responseHistoric, HistoricPulse, HistoricPulseResponseDTO);

            return {
                success: true,
                data: mapHistoric,
                messages: ['Registry of Historic Pulse for dog successfull created'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async getPulseRegistryByTimes(dogId: string, timestampStart: number, timestampEnd: number): Promise<any[]>{
        try{
            const pulses = await this.historicRepository.getRegistriesByTimes(dogId, timestampStart, timestampEnd);
            return pulses;
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
