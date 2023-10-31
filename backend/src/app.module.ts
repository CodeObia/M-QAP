import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AI } from './ai/ai.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoiService } from './doi/doi.service';
import { FormatSearvice } from './handle/formater.service';
import { HandleService } from './handle/handle.service';
import { HttpModule } from '@nestjs/axios';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TrainningDataModule } from './trainning-data/trainning-data.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainningCycleModule } from './trainning-cycle/trainning-cycle.module';
import { PredictionsModule } from './predictions/predictions.module';
import { OrganizationsModule } from './organizations/organizations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      type: 'mysql',
      synchronize: true,
      entities: [`dist/**/*.entity{.ts,.js}`],
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    HttpModule,
    TrainningDataModule,
    TrainningCycleModule,
    PredictionsModule,
    OrganizationsModule
  ],
  controllers: [AppController],
  providers: [AppService, DoiService, AI, HandleService, FormatSearvice],
})
export class AppModule {}
