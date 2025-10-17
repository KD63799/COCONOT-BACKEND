import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OpeningMeasuresController } from './opening-measures.controller';
import { OpeningMeasure, OpeningMeasureSchema } from './opening-measures.schema';
import { OpeningMeasuresService } from './opening-measures.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: OpeningMeasure.name, schema: OpeningMeasureSchema }])],
  controllers: [OpeningMeasuresController],
  providers: [OpeningMeasuresService],
  exports: [OpeningMeasuresService],
})
export class OpeningMeasuresModule {}
