
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetSuppliesModule } from './pet-supplies/pet-supplies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'nest_user',
      password: 'nest_password',
      database: 'store_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PetSuppliesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
