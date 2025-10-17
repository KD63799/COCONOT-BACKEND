import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentVariables, validateEnv } from './_utils/config/env.config';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { PredictionsModule } from './predictions/predictions.module';
import { DailyReportsModule } from './daily_reports/daily_reports.module';
import { HotHousesController } from './hothouses/hothouses.controller';
import { HotHousesModule } from './hothouses/hothouses.module';
import { TemperatureMeasuresModule } from './temperature_measures/temperature_measures.module';
import { HumidityMeasuresModule } from './humidity_measures/humidity_measures.module';
import { OpeningMeasuresModule } from './opening-measures/opening-measures.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate: validateEnv, isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables, true>) => ({
        uri: configService.get('MONGODB_URL'),
      }),
    }),
    AuthModule,
    UsersModule,
    NodemailerModule,
    HotHousesModule,
    TemperatureMeasuresModule,
    HumidityMeasuresModule,
    OpeningMeasuresModule,
    PredictionsModule,
    DailyReportsModule,
  ],
  controllers: [AppController, HotHousesController],
})
export class AppModule {}
