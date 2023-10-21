import { Injectable } from "@nestjs/common";
import { InjectModel, Model } from "nestjs-dynamoose";
import { Report, ReportKey } from "./domain/model/report.model";
import * as uuid from 'uuid';

@Injectable()
export class ReportRepository {
    constructor(
        @InjectModel('report')
        private readonly reportModel: Model<Report, ReportKey>
    ) { }

    async createReport(report: Report): Promise<Report> {
        report.id = uuid.v4();

        const reportCreated = await this.reportModel.create(report);
        return reportCreated;
    }

    async deleteReport(report: Report): Promise<boolean> {
        try {
            await this.reportModel.delete(report);
            return true;
        }
        catch (_) {
            return false;
        }
    }

    async getReportsByOwnerId(owner_id: string): Promise<any[]>{
        const queryItems = await this.reportModel.query('owner_id').eq(owner_id);
        const reports = await queryItems.exec();

        return reports;
    }

    async getReportsByVeterianrianId(veterinarian_id: string): Promise<any[]>{
        const queryItems = await this.reportModel.query('veterinarian_id').eq(veterinarian_id);
        const reports = await queryItems.exec();

        return reports;
    }
}