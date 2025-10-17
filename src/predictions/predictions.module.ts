import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PredictionsService } from './predictions.service';
import { PredictionsController } from './predictions.controller';
import { Prediction, PredictionSchema } from './predictions.schema';
import { PredictionsRepository } from './predictions.repository';
import { PredictionMapper } from './predictions.mapper';

@Module({
  imports: [MongooseModule.forFeature([{ name: Prediction.name, schema: PredictionSchema }])],
  controllers: [PredictionsController],
  providers: [PredictionsService, PredictionsRepository, PredictionMapper],
  exports: [PredictionsService],
})
export class PredictionsModule {}
