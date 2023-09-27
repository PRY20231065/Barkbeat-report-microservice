/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HistoricEcgImplService } from '../../application/service/historicEcgImpl.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HistoricEcgRequestDTO } from '../../application/dto/HistoricEcg.request.dto';

@ApiTags('ecg-data')
@Controller('ecg-data')
export class HistoricEcgController {
    constructor(private readonly historicService: HistoricEcgImplService) { }

    @ApiOperation({ summary: 'Registrar un registro de ECG canino' })
    @Post()
    async registerADog(@Body() historicReq: HistoricEcgRequestDTO) {
        return await this.historicService.create(historicReq);
    }

    @ApiOperation({ summary: 'Registrar un registro de ECG canino' })
    @ApiQuery({ name: 'timestamp_start', type: Number, required: true })
    @ApiQuery({ name: 'timestamp_end', type: Number, required: true })
    @Get(':dog_id')
    async getECGregistryBetweenTwoDates(@Param('dog_id') dog_id: string, 
    @Query('timestamp_start') timestampStart: number, 
    @Query('timestamp_end') timestampEnd: number) {
        return await this.historicService.getEcgRegistryByTimes(dog_id, timestampStart, timestampEnd);
    }

}
