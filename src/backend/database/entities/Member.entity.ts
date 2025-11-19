import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MemberPackage } from './MemberPackage.entity';
import { Attendance } from './Attendance.entity';
import { Payment } from './Payment.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName?: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ type: 'text' })
  gender: 'male' | 'female' | 'other';

  @Column({ type: 'text' })
  address: string;

  @Column({ name: 'whatsapp_no' })
  whatsappNo: string;

  @Column()
  email: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column()
  profession: string;

  @Column({ nullable: true })
  reference?: string;

  @Column({ name: 'aadhar_card' })
  aadharCard: string;

  @Column({ name: 'photo_url', nullable: true })
  photoUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => MemberPackage, memberPackage => memberPackage.member)
  memberPackages: MemberPackage[];

  @OneToMany(() => Attendance, attendance => attendance.member)
  attendanceRecords: Attendance[];

  @OneToMany(() => Payment, payment => payment.member)
  payments: Payment[];
}