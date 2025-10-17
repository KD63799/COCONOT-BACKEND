import { Controller, Get, Post, Body, Param, Delete, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { OpeningMeasuresService } from './opeaning-measures.service';
import { OpeningMeasureResponseDto } from './dto/response/opening-measure-response.dto';
import { CreateOpeningMeasureDto } from './dto/request/create-opening-measure.dto';

@ApiTags('opening-measures')
@Controller('opening-measures')
export class OpeningMeasuresController {
  constructor(private readonly openingMeasuresService: OpeningMeasuresService) {}

  @Post()
  @ApiOperation({ summary: "Créer une nouvelle mesure d'ouverture de fenêtre" })
  @ApiResponse({ status: 201, type: OpeningMeasureResponseDto })
  create(@Body() createDto: CreateOpeningMeasureDto) {
    return this.openingMeasuresService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: "Récupérer toutes les mesures d'ouverture" })
  @ApiResponse({ status: 200, type: [OpeningMeasureResponseDto] })
  findAll() {
    return this.openingMeasuresService.findAll();
  }

  @Get('hothouse/:hotHouseId')
  @ApiOperation({ summary: 'Récupérer les mesures par serre' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({ status: 200, type: [OpeningMeasureResponseDto] })
  findByHotHouse(
    @Param('hotHouseId') hotHouseId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (startDate && endDate) {
      return this.openingMeasuresService.findByHotHouseIdAndDateRange(
        hotHouseId,
        new Date(startDate),
        new Date(endDate),
      );
    }
    return this.openingMeasuresService.findByHotHouseId(hotHouseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une mesure par son ID' })
  @ApiResponse({ status: 200, type: OpeningMeasureResponseDto })
  @ApiResponse({ status: 404, description: 'Mesure non trouvée' })
  findOne(@Param('id') id: string) {
    return this.openingMeasuresService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une mesure' })
  @ApiResponse({ status: 204, description: 'Mesure supprimée' })
  remove(@Param('id') id: string) {
    return this.openingMeasuresService.remove(id);
  }
}
