import { ReportModule } from './modules/report/report.module';
import { ReportController } from './modules/report/report.controller';
import { HistoricEcgImplService } from './modules/historic-ecg/application/service/historicEcgImpl.service';
import { HistoricEcgController } from './modules/historic-ecg/infrastructure/controller/historicEcg.controller';
import { HistoricEcgModule } from './modules/historic-ecg/historicECG.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';
import { HistoricPulseModule } from './modules/historic-pulse/historicPulse.module';


@Module({
  imports: [
    ReportModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HistoricEcgModule,
    HistoricPulseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
