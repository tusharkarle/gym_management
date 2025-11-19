import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackageFormData, ApiResponse } from '../../../types';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  async create(@Body() createPackageDto: PackageFormData): Promise<ApiResponse<any>> {
    try {
      const packageEntity = await this.packagesService.create(createPackageDto);
      return {
        success: true,
        data: packageEntity,
        message: 'Package created successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get()
  async findAll(): Promise<ApiResponse<any>> {
    try {
      const packages = await this.packagesService.findAll();
      return {
        success: true,
        data: packages,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<any>> {
    try {
      const packageEntity = await this.packagesService.findOne(+id);
      return {
        success: true,
        data: packageEntity,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePackageDto: Partial<PackageFormData>
  ): Promise<ApiResponse<any>> {
    try {
      const packageEntity = await this.packagesService.update(+id, updatePackageDto);
      return {
        success: true,
        data: packageEntity,
        message: 'Package updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Post('renew/:memberId/:packageId')
  async renewPackage(
    @Param('memberId') memberId: string,
    @Param('packageId') packageId: string
  ): Promise<ApiResponse<any>> {
    try {
      const memberPackage = await this.packagesService.renewMemberPackage(+memberId, +packageId);
      return {
        success: true,
        data: memberPackage,
        message: 'Package renewed successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get('member/:memberId')
  async getMemberPackages(@Param('memberId') memberId: string): Promise<ApiResponse<any>> {
    try {
      const packages = await this.packagesService.getMemberPackages(+memberId);
      return {
        success: true,
        data: packages,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}