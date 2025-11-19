import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from './Member.entity';
import { MemberPackage } from './MemberPackage.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'member_id' })
  memberId: number;

  @Column({ name: 'member_package_id' })
  memberPackageId: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ name: 'payment_method', type: 'text' })
  paymentMethod: 'cash' | 'card' | 'upi' | 'bank_transfer';

  @Column({ name: 'transaction_id', nullable: true })
  transactionId?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Member, member => member.payments)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => MemberPackage, memberPackage => memberPackage.payments)
  @JoinColumn({ name: 'member_package_id' })
  memberPackage: MemberPackage;
}