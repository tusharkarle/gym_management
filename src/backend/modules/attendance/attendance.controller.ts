import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceFilters, ApiResponse } from '../../../types';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('checkin')
  async checkIn(@Body() body: { memberId: number; notes?: string }): Promise<ApiResponse<any>> {
    try {
      const attendance = await this.attendanceService.checkIn(body.memberId, body.notes);
      return {
        success: true,
        data: attendance,
        message: 'Check-in recorded successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get()
  async findAll(@Query() filters: AttendanceFilters): Promise<ApiResponse<any>> {
    try {
      const attendance = await this.attendanceService.findAll(filters);
      return {
        success: true,
        data: attendance,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get('today')
  async getTodaysAttendance(): Promise<ApiResponse<any>> {
    try {
      const attendance = await this.attendanceService.getTodaysAttendance();
      return {
        success: true,
        data: attendance,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}