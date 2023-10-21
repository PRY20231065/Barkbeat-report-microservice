import { DynamooseModule } from 'nestjs-dynamoose';
import { ReportSchema } from './domain/schema/report.schema';
import { ReportController } from './report.controller';
import { ReportRepository } from './report.repository';
import { ReportService } from './report.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'report',
                schema: ReportSchema,
            },
        ]),
    ],
    controllers: [
        ReportController,],
    providers: [
        ReportService, ReportRepository],
})
export class ReportModule { }
