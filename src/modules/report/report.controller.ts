/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ReportRequestDTO } from './application/dto/report.request.dto';
import { ErrorManager } from 'src/utils/errors/error.manager';

@ApiTags('reports')
@Controller('reports')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post()
    async createReport(@Body() report: ReportRequestDTO) {
        return await this.reportService.registerReport(report);
    }

    @Delete()
    async deleteReport(@Body() report: ReportRequestDTO) {
        return await this.reportService.removeReport(report);
    }

    @ApiQuery({ name: "ownerId", type: String, required: false })
    @ApiQuery({ name: "veterinarianId", type: String, required: false })
    @Get("filter")
    async filterReportBy(@Query("ownerId") ownerId: string, @Query("veterinarianId") veterinarianId: string) {
        try {
            if (!ownerId && !veterinarianId) {
                throw new ErrorManager({
                    type: 'CONFLICT',
                    message: `You must provide at least one of the ownerId or veterinarianId parameters.`
                })
                //throw new BadRequestException('');
            }

            if (ownerId && veterinarianId) {
                throw new ErrorManager({
                    type: 'CONFLICT',
                    message: `You can't provide both ownerId and veterinarianId parameters at the same time.`
                })
            }

            if (ownerId) {
                return await this.reportService.findReportsByOwnerId(ownerId);

            }
            else {
                return await this.reportService.findReportsByVetId(veterinarianId);
            }

        } catch (error) {
            throw ErrorManager.createSignatureError(error.message)
        }
    }

}
