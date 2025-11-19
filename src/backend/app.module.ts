import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MembersModule } from './modules/members/members.module';
import { PackagesModule } from './modules/packages/packages.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ReportsModule } from './modules/reports/reports.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    DatabaseModule,
    MembersModule,
    PackagesModule,
    AttendanceModule,
    PaymentsModule,
    ReportsModule,
    SettingsModule,
  ],
})
export class AppModule {}