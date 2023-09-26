import { IGenericResponse } from "src/utils/generic";
import { HistoricEcgRequestDTO } from "../../application/dto/HistoricEcg.request.dto";
import { HistoricEcgResponseDTO } from "../../application/dto/HistoricEcg.response.dto";

export interface HistoricEcgService {
    create(historic: HistoricEcgRequestDTO): Promise<IGenericResponse<HistoricEcgResponseDTO>>;
}