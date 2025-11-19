import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Member } from './Member.entity';
import { Package } from './Package.entity';
import { Payment } from './Payment.entity';

@Entity('member_packages')
export class MemberPackage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'member_id' })
  memberId: number;

  @Column({ name: 'package_id' })
  packageId: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'text', default: 'active' })
  status: 'active' | 'expired' | 'cancelled';

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Member, member => member.memberPackages)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Package, pkg => pkg.memberPackages)
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @OneToMany(() => Payment, payment => payment.memberPackage)
  payments: Payment[];
}