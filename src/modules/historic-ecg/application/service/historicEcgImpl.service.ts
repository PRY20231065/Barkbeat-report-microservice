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

            const responseHistoric = await this.historicRepository.create(historicModel);

            if (!responseHistoric) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Registry of Historic ECG for dog not was created`
                })
            }

            const mapHistoric = mapper.map(responseHistoric, HistoricEcg, HistoricEcgResponseDTO);

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
}
