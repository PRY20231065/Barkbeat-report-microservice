/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { HistoricEcgImplService } from '../../application/service/historicEcgImpl.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HistoricEcgRequestDTO } from '../../application/dto/HistoricEcg.request.dto';

@ApiTags('ecg-data')
@Controller('ecg-data')
export class HistoricEcgController {
    constructor(private readonly historicService: HistoricEcgImplService){}

    @ApiOperation({ summary: 'Registrar un registro de ECG canino' })
    @Post()
    async registerADog(@Body() historicReq: HistoricEcgRequestDTO){
        return await this.historicService.create(historicReq);
    }
}
