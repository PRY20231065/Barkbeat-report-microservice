/*Pulse
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { HistoricPulseImplService } from '../../application/service/historicPulseImpl.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { HistoricPulseRequestDTO } from '../../application/dto/HistoricPulse.request.dto';

@ApiTags('pulse-data')
@Controller('pulse-data')
export class HistoricPulseController {
    constructor(private readonly historicService: HistoricPulseImplService) { }

    @ApiOperation({ summary: 'Registrar pulso canino' })
    @Post()
    async registerADog(@Body() historicReq: HistoricPulseRequestDTO) {
        return await this.historicService.create(historicReq);
    }

    @ApiOperation({ summary: 'Obtener un historial de pulso canino por tiempos' })
    @ApiQuery({ name: 'timestamp_start', type: Number, required: true })
    @ApiQuery({ name: 'timestamp_end', type: Number, required: true })
    @Get(':dog_id')
    async getPulseregistryBetweenTwoDates(@Param('dog_id') dog_id: string, 
    @Query('timestamp_start') timestampStart: number, 
    @Query('timestamp_end') timestampEnd: number) {
        return await this.historicService.getPulseRegistryByTimes(dog_id, timestampStart, timestampEnd);
    }

    @Get(':dog_id/last-5-minutes-record')
    async getRegistryLast5minutes(@Param('dog_id') dogId: string){
        return await this.historicService.getRegistryLast5minutes(dogId)
    }

}
