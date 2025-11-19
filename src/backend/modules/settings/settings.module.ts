import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from '../../database/entities/Settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
})
export class SettingsModule {}