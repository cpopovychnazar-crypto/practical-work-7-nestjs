
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { PetSupplyEntity } from './pet-supply.entity';

@Entity('animal_types')
export class AnimalTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @OneToMany(
    () => PetSupplyEntity,
    (petSupply) => petSupply.animalType,
  )
  petSupplies: PetSupplyEntity[];
}
