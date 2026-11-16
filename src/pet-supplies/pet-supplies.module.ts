
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetSuppliesController } from './pet-supplies.controller';
import { PetSuppliesService } from './pet-supplies.service';
import { SharedModule } from '../shared/shared.module';
import { PetSupplyEntity } from './entities/pet-supply.entity';
import { AnimalTypeEntity } from './entities/animal-type.entity';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([
      PetSupplyEntity,
      AnimalTypeEntity,
    ]),
  ],
  controllers: [PetSuppliesController],
  providers: [PetSuppliesService],
})
export class PetSuppliesModule {}
