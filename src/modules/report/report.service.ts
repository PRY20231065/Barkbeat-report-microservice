import { HttpStatus, Injectable } from '@nestjs/common';
import { ReportRepository } from './report.repository';
import { ReportRequestDTO } from './application/dto/report.request.dto';
import { mapper } from 'src/utils/mapping/mapper';
import { Report } from './domain/model/report.model';
import { ErrorManager } from 'src/utils/errors/error.manager';
import { ReportResponseDTO } from './application/dto/report.response.dto';

@Injectable()
export class ReportService {
    constructor(
        private readonly reportRepository: ReportRepository
    ){}

    async registerReport(reportRequest: ReportRequestDTO){
        try{
            const reportModel = mapper.map(reportRequest, ReportRequestDTO, Report);
            reportModel.indications = reportRequest.indications;

            const responseReport = await this.reportRepository.createReport(reportModel);

            if (!responseReport) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Report not was created`
                })
            }

            const mapReport = mapper.map(responseReport, Report, ReportResponseDTO);

            return {
                success: true,
                data: mapReport,
                messages: ['Report successfull created'],
                code: HttpStatus.OK
            };


        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async removeReport(reportRequest: ReportRequestDTO){
        try{
            const reportModel = mapper.map(reportRequest, ReportRequestDTO, Report);

            const responseReport = await this.reportRepository.deleteReport(reportModel);

            if (!responseReport) {
                throw new ErrorManager({
                    type: 'BAD_REQUEST',
                    message: `Report not was deleted`
                })
            }

            return {
                success: true,
                data: responseReport,
                messages: ['Report successfull deleted'],
                code: HttpStatus.OK
            };


        }catch(error){
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async findReportsByOwnerId(owner_id: string): Promise<any>{
        try {
            const response = await this.reportRepository.getReportsByOwnerId(owner_id);
            
            return {
                success: true,
                size: response.length,
                items: response,
            }
        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }

    async findReportsByVetId(vet_id: string): Promise<any>{
        try {
            const response = await this.reportRepository.getReportsByVeterianrianId(vet_id);
            
            return {
                success: true,
                size: response.length,
                items: response,
            }
        } catch (error) {
            console.log(error);
            throw ErrorManager.createSignatureError(error.message)
        }
    }
}
