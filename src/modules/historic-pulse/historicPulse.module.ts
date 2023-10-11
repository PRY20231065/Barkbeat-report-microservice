/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HistoricPulseController } from './infrastructure/controller/historicPulse.controller';
import { HistoricPulseImplService } from './application/service/historicPulseImpl.service';
import { HistoricPulseImplRepository } from './infrastructure/repository/historicPulseImpl.repository';
import { DynamooseModule } from 'nestjs-dynamoose';
import { HistoricPulseSchema } from './domain/schema/historicPulse.schema';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'historic_pulse',
                schema: HistoricPulseSchema,
            },
        ]),
    ],
    controllers: [HistoricPulseController],
    providers: [HistoricPulseImplService, HistoricPulseImplRepository],
})
export class HistoricPulseModule {}
