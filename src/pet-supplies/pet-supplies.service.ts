
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetSupplyEntity } from './entities/pet-supply.entity';

@Injectable()
export class PetSuppliesService {
  constructor(
    @InjectRepository(PetSupplyEntity)
    private readonly petSuppliesRepository: Repository<PetSupplyEntity>,
  ) {}

  async findAll(): Promise<PetSupplyEntity[]> {
    return this.petSuppliesRepository.find({
      relations: {
        animalType: true,
      },
    });
  }

  async findOne(id: string): Promise<PetSupplyEntity> {
    const petSupply = await this.petSuppliesRepository.findOne({
      where: { id },
      relations: {
        animalType: true,
      },
    });

    if (!petSupply) {
      throw new NotFoundException('Товар не знайдено');
    }

    return petSupply;
  }
}
