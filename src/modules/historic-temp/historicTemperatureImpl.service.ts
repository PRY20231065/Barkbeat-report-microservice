import { HttpStatus, Injectable } from '@nestjs/common';
import { HistoricTemperatureImplRepository } from './historicTemperatureImpl.repository';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { mapper } from 'src/utils/mapping/mapper';
import { IGenericResponse } from 'src/utils/generic';
import { HistoricTempRequestDTO } from './application/dto/HistoricTemp.request.dto';
import { HistoricTempResponseDTO } from './application/dto/HistoricTemp.response.dto';
import { HistoricTemperature } from './domain/model/historicTemp.model';

@Injectable()
export class HistoricTemperatureImplService {

    constructor(
        private readonly historicRepository: HistoricTemperatureImplRepository
    ){}

    async create(historicReq: HistoricTempRequestDTO): Promise<IGenericResponse<HistoricTempResponseDTO>> {
        try {
            const historicModel = mapper.map(historicReq, HistoricTempRequestDTO, HistoricTemperature);

            const responseHistoric = await this.historicRepository.create(historicModel);

            if (!responseHistoric) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Registry of Historic Temp for dog not was created`
                })
            }

            const mapHistoric = mapper.map(responseHistoric, HistoricTemperature, HistoricTempResponseDTO);

            return {
                success: true,
                data: mapHistoric,
                messages: ['Registry of Historic Temp for dog successfull created'],
                code: HttpStatus.OK
            };

        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async getTemperatureRegistryByTimes(dogId: string, timestampStart: number, timestampEnd: number): Promise<any[]>{
        try{
            const pulses = await this.historicRepository.getRegistriesByTimes(dogId, timestampStart, timestampEnd);
            return pulses;
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async getRegistryLast5minutes(dogId: string): Promise<any[]>{
        try{
            const pulses = await this.historicRepository.getRegistryLast5minutesTemp(dogId);
            return pulses;
        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async getLastRegistry(dogId: string): Promise<IGenericResponse<HistoricTempResponseDTO>> {
        try{
            const temp = await this.historicRepository.getLastRegistryTemp(dogId);
            if(temp){

                const mapHistoric = mapper.map(temp, HistoricTemperature, HistoricTempResponseDTO);

                return {
                    success: true,
                    code: HttpStatus.OK,
                    data: mapHistoric,
                    messages: ['Last registry found']
                }
            }else{
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Last registry not was found`
                })
            }

        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
