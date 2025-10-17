import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateDailyReportDto } from './_utils/dto/request/create-daily-report.dto';
import { DailyReportResponseDto } from './_utils/dto/response/get-daily-report-response.dto';
import { DailyReportsService } from './daily_reports.service';

@ApiTags('daily-reports')
@Controller('daily-reports')
export class DailyReportsController {
  constructor(private readonly dailyReportsService: DailyReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau rapport journalier' })
  @ApiResponse({ status: 201, type: DailyReportResponseDto })
  create(@Body() createDto: CreateDailyReportDto) {
    return this.dailyReportsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les rapports journaliers' })
  @ApiResponse({ status: 200, type: [DailyReportResponseDto] })
  findAll() {
    return this.dailyReportsService.findAll();
  }

  @Get('hothouse/:hotHouseId')
  @ApiOperation({ summary: 'Récupérer les rapports par serre' })
  @ApiResponse({ status: 200, type: [DailyReportResponseDto] })
  findByHotHouse(@Param('hotHouseId') hotHouseId: string) {
    return this.dailyReportsService.findByHotHouseId(hotHouseId);
  }

  @Get('date/:date')
  @ApiOperation({ summary: "Récupérer tous les rapports d'une date spécifique" })
  @ApiResponse({ status: 200, type: [DailyReportResponseDto] })
  findByDate(@Param('date') date: string) {
    return this.dailyReportsService.findByDate(date);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un rapport par son ID' })
  @ApiResponse({ status: 200, type: DailyReportResponseDto })
  @ApiResponse({ status: 404, description: 'Rapport non trouvé' })
  findOne(@Param('id') id: string) {
    return this.dailyReportsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer un rapport' })
  @ApiResponse({ status: 204, description: 'Rapport supprimé' })
  remove(@Param('id') id: string) {
    return this.dailyReportsService.remove(id);
  }
}
