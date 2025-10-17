import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PredictionsService } from './predictions.service';
import { CreatePredictionDto } from './_utils/dto/request/create-prediction.dto';
import { GetPredictionResponseDto } from './_utils/dto/response/get-prediction-response.dto';

@ApiTags('predictions')
@Controller('predictions')
export class PredictionsController {
  constructor(private readonly predictionsService: PredictionsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle prédiction' })
  @ApiResponse({ status: 201, type: GetPredictionResponseDto })
  create(@Body() createDto: CreatePredictionDto) {
    return this.predictionsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les prédictions' })
  @ApiResponse({ status: 200, type: [GetPredictionResponseDto] })
  findAll() {
    return this.predictionsService.findAll();
  }

  @Get('today')
  @ApiOperation({ summary: 'Récupérer toutes les prédictions du jour' })
  @ApiResponse({ status: 200, type: [GetPredictionResponseDto] })
  findTodayPredictions() {
    return this.predictionsService.findTodayPredictions();
  }

  @Get('hothouse/:hotHouseId')
  @ApiOperation({ summary: 'Récupérer les prédictions par serre' })
  @ApiResponse({ status: 200, type: [GetPredictionResponseDto] })
  findByHotHouse(@Param('hotHouseId') hotHouseId: string) {
    return this.predictionsService.findByHotHouseId(hotHouseId);
  }

  @Get('date/:date')
  @ApiOperation({ summary: "Récupérer toutes les prédictions d'une date spécifique" })
  @ApiResponse({ status: 200, type: [GetPredictionResponseDto] })
  findByDate(@Param('date') date: string) {
    return this.predictionsService.findByDate(date);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une prédiction par son ID' })
  @ApiResponse({ status: 200, type: GetPredictionResponseDto })
  @ApiResponse({ status: 404, description: 'Prédiction non trouvée' })
  findOne(@Param('id') id: string) {
    return this.predictionsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une prédiction' })
  @ApiResponse({ status: 204, description: 'Prédiction supprimée' })
  remove(@Param('id') id: string) {
    return this.predictionsService.remove(id);
  }
}
