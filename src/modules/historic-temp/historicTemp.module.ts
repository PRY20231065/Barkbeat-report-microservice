import { Module } from '@nestjs/common';

import { DynamooseModule } from 'nestjs-dynamoose';
import { HistoricTemperatureController } from './historicTemperature.controller';
import { HistoricTemperatureImplService } from './historicTemperatureImpl.service';
import { HistoricTemperatureImplRepository } from './historicTemperatureImpl.repository';
import { HistoricTemperatureSchema } from './domain/schema/historicTemp.schema';


@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'historic_temperature',
                schema: HistoricTemperatureSchema,
            },
        ]),
    ],
    controllers: [HistoricTemperatureController],
    providers: [HistoricTemperatureImplService, HistoricTemperatureImplRepository],
})
export class HistoricTempModule {}
