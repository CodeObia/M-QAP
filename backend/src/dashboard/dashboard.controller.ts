import { Controller, Get } from '@nestjs/common';
import { TrainingCycle } from 'src/entities/training-cycle.entity';
import { PredictionsService } from 'src/predictions/predictions.service';
import { TrainingDataService } from 'src/training-data/training-data.service';
import { DataSource } from 'typeorm';

@Controller('dashboard')
export class DashboardController {
  constructor(private dataSource: DataSource,private trainningDataService :TrainingDataService,private predictionsService :PredictionsService) {}
  @Get('avg_confidant')
  avg_confidant() {
    return  this.dataSource
    .createQueryBuilder()
    .from('predictions', 'predictions')
    .leftJoin(TrainingCycle,'cycle','cycle.id =  predictions.trainning_cycle_id')
    .addSelect(`AVG(predictions.confidant)`, 'avg_confidant')
    .addSelect('cycle.id','cycle_id')
    .addSelect('cycle.text','cycle_name')
    .addGroupBy('cycle.id')
    .execute();

    
  }

  @Get('counters')
 async counters() {
    return {
    trainningData: await this.trainningDataService.trainingDataRepository.count(),
    predictions: await this.predictionsService.predictionsRepository.count()
   }
  }

}
