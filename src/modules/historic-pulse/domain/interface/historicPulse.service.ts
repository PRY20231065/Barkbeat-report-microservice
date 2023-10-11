import { IGenericResponse } from "src/utils/generic";
import { HistoricPulseRequestDTO } from "../../application/dto/HistoricPulse.request.dto";
import { HistoricPulseResponseDTO } from "../../application/dto/HistoricPulse.response.dto";

export interface HistoricPulseService {
    create(historic: HistoricPulseRequestDTO): Promise<IGenericResponse<HistoricPulseResponseDTO>>;
}