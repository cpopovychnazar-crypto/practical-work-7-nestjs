
import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { PetSuppliesService } from './pet-supplies.service';
import { PetSupplyEntity } from './entities/pet-supply.entity';

@Controller('pet-supplies')
export class PetSuppliesController {
  constructor(
    private readonly petSuppliesService: PetSuppliesService,
  ) {}

  @Get()
  findAll(): Promise<PetSupplyEntity[]> {
    return this.petSuppliesService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<PetSupplyEntity> {
    return this.petSuppliesService.findOne(id);
  }
}
