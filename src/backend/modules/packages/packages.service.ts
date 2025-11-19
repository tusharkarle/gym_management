import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from '../../database/entities/Package.entity';
import { MemberPackage } from '../../database/entities/MemberPackage.entity';
import { PackageFormData } from '../../../types';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>,
    @InjectRepository(MemberPackage)
    private memberPackagesRepository: Repository<MemberPackage>,
  ) {}

  async create(packageData: PackageFormData): Promise<Package> {
    const packageEntity = this.packagesRepository.create(packageData);
    return await this.packagesRepository.save(packageEntity);
  }

  async findAll(): Promise<Package[]> {
    return await this.packagesRepository.find({
      where: { isActive: true },
      order: { durationMonths: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Package> {
    const packageEntity = await this.packagesRepository.findOne({
      where: { id },
    });
    
    if (!packageEntity) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    
    return packageEntity;
  }

  async update(id: number, updateData: Partial<PackageFormData>): Promise<Package> {
    const packageEntity = await this.findOne(id);
    Object.assign(packageEntity, updateData);
    return await this.packagesRepository.save(packageEntity);
  }

  async renewMemberPackage(memberId: number, packageId: number): Promise<MemberPackage> {
    const packageEntity = await this.findOne(packageId);
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + packageEntity.durationMonths);

    const memberPackage = this.memberPackagesRepository.create({
      memberId,
      packageId,
      startDate,
      endDate,
      amount: packageEntity.price,
      status: 'active',
    });

    return await this.memberPackagesRepository.save(memberPackage);
  }

  async getMemberPackages(memberId: number): Promise<MemberPackage[]> {
    return await this.memberPackagesRepository.find({
      where: { memberId },
      relations: ['package'],
      order: { createdAt: 'DESC' },
    });
  }
}