/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HistoricTemperatureImplService } from './historicTemperatureImpl.service';
import { HistoricTempRequestDTO } from './application/dto/HistoricTemp.request.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('temp-data')
@Controller('temp-data')
export class HistoricTemperatureController {
    constructor(private readonly historicService: HistoricTemperatureImplService) { }

    @ApiOperation({ summary: 'Registrar temperatura canina' })
    @Post()
    async registerADog(@Body() historicReq: HistoricTempRequestDTO) {
        return await this.historicService.create(historicReq);
    }

    @ApiOperation({ summary: 'Obtener un historial de temperatura canino por tiempos' })
    @ApiQuery({ name: 'timestamp_start', type: Number, required: true })
    @ApiQuery({ name: 'timestamp_end', type: Number, required: true })
    @Get(':dog_id')
    async getTempregistryBetweenTwoDates(@Param('dog_id') dog_id: string, 
    @Query('timestamp_start') timestampStart: number, 
    @Query('timestamp_end') timestampEnd: number) {
        return await this.historicService.getTemperatureRegistryByTimes(dog_id, timestampStart, timestampEnd);
    }

    @Get(':dog_id/last-5-minutes-record')
    async getRegistryLast5minutes(@Param('dog_id') dogId: string){
        return await this.historicService.getRegistryLast5minutes(dogId)
    }
}
