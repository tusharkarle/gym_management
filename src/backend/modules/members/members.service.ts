import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Member } from '../../database/entities/Member.entity';
import { MemberFormData, MemberFilters } from '../../../types';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async create(memberData: MemberFormData): Promise<Member> {
    const member = this.membersRepository.create({
      ...memberData,
      dateOfBirth: new Date(memberData.dateOfBirth),
    });
    return await this.membersRepository.save(member);
  }

  async findAll(filters: MemberFilters = {}): Promise<Member[]> {
    const where: any = {};
    
    if (filters.search) {
      where.firstName = Like(`%${filters.search}%`);
    }
    
    if (filters.gender) {
      where.gender = filters.gender;
    }

    return await this.membersRepository.find({
      where,
      order: { createdAt: 'DESC' },
      relations: ['memberPackages', 'memberPackages.package'],
    });
  }

  async findOne(id: number): Promise<Member> {
    const member = await this.membersRepository.findOne({
      where: { id },
      relations: ['memberPackages', 'memberPackages.package', 'attendanceRecords', 'payments'],
    });
    
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    
    return member;
  }

  async update(id: number, updateData: Partial<MemberFormData>): Promise<Member> {
    const member = await this.findOne(id);
    
    if (updateData.dateOfBirth) {
      updateData.dateOfBirth = new Date(updateData.dateOfBirth) as any;
    }
    
    Object.assign(member, updateData);
    return await this.membersRepository.save(member);
  }

  async remove(id: number): Promise<void> {
    const member = await this.findOne(id);
    await this.membersRepository.remove(member);
  }

  async findByAadhar(aadharCard: string): Promise<Member | null> {
    return await this.membersRepository.findOne({
      where: { aadharCard },
    });
  }

  async findByEmail(email: string): Promise<Member | null> {
    return await this.membersRepository.findOne({
      where: { email },
    });
  }
}