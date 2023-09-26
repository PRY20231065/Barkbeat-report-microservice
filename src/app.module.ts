import { HistoricEcgImplService } from './modules/historic-ecg/application/service/historicEcgImpl.service';
import { HistoricEcgController } from './modules/historic-ecg/infrastructure/controller/historicEcg.controller';
import { HistoricEcgModule } from './modules/historic-ecg/historicECG.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './common/database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HistoricEcgModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
