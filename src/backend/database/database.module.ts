import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/Member.entity';
import { Package } from './entities/Package.entity';
import { MemberPackage } from './entities/MemberPackage.entity';
import { Attendance } from './entities/Attendance.entity';
import { Payment } from './entities/Payment.entity';
import { Settings } from './entities/Settings.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'gym_management.db',
      entities: [Member, Package, MemberPackage, Attendance, Payment, Settings],
      synchronize: true, // Set to false in production
      logging: false,
    }),
    TypeOrmModule.forFeature([Member, Package, MemberPackage, Attendance, Payment, Settings]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}