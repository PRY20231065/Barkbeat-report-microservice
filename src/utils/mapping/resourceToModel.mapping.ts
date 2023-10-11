import { createMap, createMapper } from '@automapper/core';
import { mapper } from './mapper';
import { HistoricEcgRequestDTO } from 'src/modules/historic-ecg/application/dto/HistoricEcg.request.dto';
import { HistoricEcg } from 'src/modules/historic-ecg/domain/model/historicECG.model';
import { HistoricPulseRequestDTO } from 'src/modules/historic-pulse/application/dto/HistoricPulse.request.dto';
import { HistoricPulse } from 'src/modules/historic-pulse/domain/model/historicPulse.model';





export const resourceToModel = () => {
    //createMap(mapper, CreateDogRequestDTO, Dog);
    createMap(mapper, HistoricEcgRequestDTO, HistoricEcg);
    createMap(mapper, HistoricPulseRequestDTO, HistoricPulse);
}
