import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TemperatureMeasuresService } from './temperature_measures.service';
import { CreateTemperatureMeasureDto } from './_utils/dto/request/create-temperature-measure.dto';
import { GetTemperatureMeasureResponseDto } from './_utils/dto/response/get-temperature-measure-response.dto';

@ApiTags('temperature-measures')
@Controller('temperature-measures')
export class TemperatureMeasuresController {
  constructor(private readonly temperatureMeasuresService: TemperatureMeasuresService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle mesure de température' })
  @ApiResponse({ status: 201, type: GetTemperatureMeasureResponseDto })
  create(@Body() createDto: CreateTemperatureMeasureDto) {
    return this.temperatureMeasuresService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les mesures de température' })
  @ApiResponse({ status: 200, type: [GetTemperatureMeasureResponseDto] })
  findAll() {
    return this.temperatureMeasuresService.findAll();
  }

  @Get('hothouse/:hotHouseId')
  @ApiOperation({ summary: 'Récupérer les mesures par serre' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, type: [GetTemperatureMeasureResponseDto] })
  findByHotHouse(
    @Param('hotHouseId') hotHouseId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (startDate && endDate) {
      return this.temperatureMeasuresService.findByHotHouseIdAndDateRange(
        hotHouseId,
        new Date(startDate),
        new Date(endDate),
      );
    }
    return this.temperatureMeasuresService.findByHotHouseId(hotHouseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une mesure par son ID' })
  @ApiResponse({ status: 200, type: GetTemperatureMeasureResponseDto })
  @ApiResponse({ status: 404, description: 'Mesure non trouvée' })
  findOne(@Param('id') id: string) {
    return this.temperatureMeasuresService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une mesure' })
  @ApiResponse({ status: 204, description: 'Mesure supprimée' })
  remove(@Param('id') id: string) {
    return this.temperatureMeasuresService.remove(id);
  }
}
