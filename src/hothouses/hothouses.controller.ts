import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HotHousesService } from './hothouses.service';
import { HotHouseWithPredictionResponseDto } from './_utils/dto/response/get-hot-house-with-prediction-response.dto';
import { CreateHotHouseDto } from './_utils/dto/request/create-hot-house.dto';
import { GetHotHouseResponseDto } from './_utils/dto/response/get-hot-house-response.dto';
import { UpdateHotHouseDto } from './_utils/dto/request/update-hot-house.dto';

@ApiTags('hothouses')
@Controller('hothouses')
export class HotHousesController {
  constructor(private readonly hotHousesService: HotHousesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle serre' })
  @ApiResponse({ status: 201, description: 'Serre créée avec succès', type: GetHotHouseResponseDto })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(@Body() createHotHouseDto: CreateHotHouseDto) {
    return this.hotHousesService.create(createHotHouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les serres' })
  @ApiResponse({ status: 200, description: 'Liste des serres', type: [GetHotHouseResponseDto] })
  findAll() {
    return this.hotHousesService.findAll();
  }

  @Get('with-predictions')
  @ApiOperation({ summary: 'Récupérer toutes les serres avec leurs prédictions du jour' })
  @ApiResponse({
    status: 200,
    description: 'Liste des serres avec prédictions',
    type: [HotHouseWithPredictionResponseDto],
  })
  findAllWithPredictions() {
    return this.hotHousesService.findAllWithTodayPredictions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une serre par son ID' })
  @ApiResponse({ status: 200, description: 'Serre trouvée', type: GetHotHouseResponseDto })
  @ApiResponse({ status: 404, description: 'Serre non trouvée' })
  findOne(@Param('id') id: string) {
    return this.hotHousesService.findOne(id);
  }

  @Get(':id/with-prediction')
  @ApiOperation({ summary: 'Récupérer une serre avec sa prédiction du jour' })
  @ApiResponse({
    status: 200,
    description: 'Serre avec prédiction',
    type: HotHouseWithPredictionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Serre non trouvée' })
  findOneWithPrediction(@Param('id') id: string) {
    return this.hotHousesService.findOneWithTodayPrediction(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une serre' })
  @ApiResponse({ status: 200, description: 'Serre mise à jour', type: GetHotHouseResponseDto })
  @ApiResponse({ status: 404, description: 'Serre non trouvée' })
  update(@Param('id') id: string, @Body() updateHotHouseDto: UpdateHotHouseDto) {
    return this.hotHousesService.update(id, updateHotHouseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une serre' })
  @ApiResponse({ status: 204, description: 'Serre supprimée' })
  @ApiResponse({ status: 404, description: 'Serre non trouvée' })
  remove(@Param('id') id: string) {
    return this.hotHousesService.remove(id);
  }
}
