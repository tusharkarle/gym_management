import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MembersService } from './members.service';
import { MemberFormData, MemberFilters, ApiResponse } from '../../../types';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async create(@Body() createMemberDto: MemberFormData): Promise<ApiResponse<any>> {
    try {
      // Check if member already exists with same Aadhar or email
      const existingAadhar = await this.membersService.findByAadhar(createMemberDto.aadharCard);
      if (existingAadhar) {
        return {
          success: false,
          error: 'Member with this Aadhar card already exists',
        };
      }

      const existingEmail = await this.membersService.findByEmail(createMemberDto.email);
      if (existingEmail) {
        return {
          success: false,
          error: 'Member with this email already exists',
        };
      }

      const member = await this.membersService.create(createMemberDto);
      return {
        success: true,
        data: member,
        message: 'Member created successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get()
  async findAll(@Query() filters: MemberFilters): Promise<ApiResponse<any>> {
    try {
      const members = await this.membersService.findAll(filters);
      return {
        success: true,
        data: members,
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
      const member = await this.membersService.findOne(+id);
      return {
        success: true,
        data: member,
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
    @Body() updateMemberDto: Partial<MemberFormData>
  ): Promise<ApiResponse<any>> {
    try {
      const member = await this.membersService.update(+id, updateMemberDto);
      return {
        success: true,
        data: member,
        message: 'Member updated successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse<any>> {
    try {
      await this.membersService.remove(+id);
      return {
        success: true,
        message: 'Member deleted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}