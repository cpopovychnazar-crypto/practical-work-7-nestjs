
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AnimalTypeEntity } from './animal-type.entity';

@Entity('pet_supplies')
export class PetSupplyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(
    () => AnimalTypeEntity,
    (animalType) => animalType.petSupplies,
    { nullable: true, onDelete: 'RESTRICT' },
  )
  @JoinColumn({ name: 'animal_type_id' })
  animalType: AnimalTypeEntity;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  packageWeightKg: number;

  @Column({ type: 'varchar', length: 80 })
  brand: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;
}
