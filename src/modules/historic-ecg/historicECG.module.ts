/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { HistoricEcgController } from './infrastructure/controller/historicEcg.controller';
import { HistoricEcgImplService } from './application/service/historicEcgImpl.service';
import { HistoricEcgImplRepository } from './infrastructure/repository/historicECGImpl.repository';
import { DynamooseModule } from 'nestjs-dynamoose';
import { HistoricEcgSchema } from './domain/schema/historicECG.schema';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'historic_ecg',
                schema: HistoricEcgSchema,
            },
        ]),
    ],
    controllers: [HistoricEcgController],
    providers: [HistoricEcgImplService, HistoricEcgImplRepository],
})
export class HistoricEcgModule {}
