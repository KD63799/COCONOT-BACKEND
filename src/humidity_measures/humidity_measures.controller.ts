import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CreateHumidityMeasureDto } from './_utils/dto/request/create-humidity-measure.dto';
import { GetHumidityMeasureResponseDto } from './_utils/dto/response/get-humidity-measure-response.dto';
import { HumidityMeasuresService } from './humidity_measures.service';

@ApiTags('humidity-measures')
@Controller('humidity-measures')
export class HumidityMeasuresController {
  constructor(private readonly humidityMeasuresService: HumidityMeasuresService) {}

  @Post()
  @ApiOperation({ summary: "Créer une nouvelle mesure d'humidité" })
  @ApiResponse({ status: 201, type: GetHumidityMeasureResponseDto })
  create(@Body() createDto: CreateHumidityMeasureDto) {
    return this.humidityMeasuresService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: "Récupérer toutes les mesures d'humidité" })
  @ApiResponse({ status: 200, type: [GetHumidityMeasureResponseDto] })
  findAll() {
    return this.humidityMeasuresService.findAll();
  }

  @Get('hothouse/:hotHouseId')
  @ApiOperation({ summary: 'Récupérer les mesures par serre' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, type: [GetHumidityMeasureResponseDto] })
  findByHotHouse(
    @Param('hotHouseId') hotHouseId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (startDate && endDate) {
      return this.humidityMeasuresService.findByHotHouseIdAndDateRange(
        hotHouseId,
        new Date(startDate),
        new Date(endDate),
      );
    }
    return this.humidityMeasuresService.findByHotHouseId(hotHouseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une mesure par son ID' })
  @ApiResponse({ status: 200, type: GetHumidityMeasureResponseDto })
  @ApiResponse({ status: 404, description: 'Mesure non trouvée' })
  findOne(@Param('id') id: string) {
    return this.humidityMeasuresService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une mesure' })
  @ApiResponse({ status: 204, description: 'Mesure supprimée' })
  remove(@Param('id') id: string) {
    return this.humidityMeasuresService.remove(id);
  }
}
