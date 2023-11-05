import { ReportModule } from './modules/report/report.module';
import { HistoricEcgModule } from './modules/historic-ecg/historicECG.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { HistoricPulseModule } from './modules/historic-pulse/historicPulse.module';
import { HistoricTempModule } from './modules/historic-temp/historicTemp.module';


@Module({
  imports: [
    ReportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HistoricEcgModule,
    HistoricPulseModule,
    HistoricTempModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
