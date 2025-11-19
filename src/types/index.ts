// Database Entity Types
export interface Member {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  whatsappNo: string;
  email: string;
  dateOfBirth: Date;
  profession: string;
  reference?: string;
  aadharCard: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Package {
  id: number;
  name: string;
  durationMonths: 1 | 3 | 6 | 12;
  price: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MemberPackage {
  id: number;
  memberId: number;
  packageId: number;
  startDate: Date;
  endDate: Date;
  amount: number;
  status: 'active' | 'expired' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  id: number;
  memberId: number;
  checkInTime: Date;
  notes?: string;
  createdAt: Date;
}

export interface Payment {
  id: number;
  memberId: number;
  memberPackageId: number;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'upi' | 'bank_transfer';
  transactionId?: string;
  notes?: string;
  createdAt: Date;
}

export interface Settings {
  id: number;
  key: string;
  value: string;
  description?: string;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form Types
export interface MemberFormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  whatsappNo: string;
  email: string;
  dateOfBirth: string;
  profession: string;
  reference?: string;
  aadharCard: string;
  photoUrl?: string;
}

export interface PackageFormData {
  name: string;
  durationMonths: 1 | 3 | 6 | 12;
  price: number;
  description?: string;
}

// Filter Types
export interface MemberFilters {
  search?: string;
  gender?: string;
  packageStatus?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface AttendanceFilters {
  memberId?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface PaymentFilters {
  memberId?: number;
  paymentMethod?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}