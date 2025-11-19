import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Attendance } from '../../database/entities/Attendance.entity';
import { Member } from '../../database/entities/Member.entity';
import { AttendanceFilters } from '../../../types';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async checkIn(memberId: number, notes?: string): Promise<Attendance> {
    // Verify member exists
    const member = await this.membersRepository.findOne({
      where: { id: memberId },
    });
    
    if (!member) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }

    const attendance = this.attendanceRepository.create({
      memberId,
      checkInTime: new Date(),
      notes,
    });

    return await this.attendanceRepository.save(attendance);
  }

  async findAll(filters: AttendanceFilters = {}): Promise<Attendance[]> {
    const where: any = {};
    
    if (filters.memberId) {
      where.memberId = filters.memberId;
    }
    
    if (filters.dateRange) {
      where.checkInTime = Between(filters.dateRange.start, filters.dateRange.end);
    }

    return await this.attendanceRepository.find({
      where,
      relations: ['member'],
      order: { checkInTime: 'DESC' },
    });
  }

  async getTodaysAttendance(): Promise<Attendance[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await this.attendanceRepository.find({
      where: {
        checkInTime: Between(today, tomorrow),
      },
      relations: ['member'],
      order: { checkInTime: 'DESC' },
    });
  }
}