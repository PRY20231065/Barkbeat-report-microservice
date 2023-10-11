import { createMap, forMember } from '@automapper/core';
import { mapper } from './mapper';
import { HistoricEcg } from 'src/modules/historic-ecg/domain/model/historicECG.model';
import { HistoricEcgResponseDTO } from 'src/modules/historic-ecg/application/dto/HistoricEcg.response.dto';
import { HistoricPulse } from 'src/modules/historic-pulse/domain/model/historicPulse.model';
import { HistoricPulseResponseDTO } from 'src/modules/historic-pulse/application/dto/HistoricPulse.response.dto';




export const modelToResource = () =>{
    createMap(mapper, HistoricEcg, HistoricEcgResponseDTO);
    createMap(mapper, HistoricPulse, HistoricPulseResponseDTO);
}
