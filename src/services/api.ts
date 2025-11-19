import { MemberFormData, MemberFilters, ApiResponse, Member } from '../types'

const API_BASE_URL = 'http://localhost:3001/api/v1'

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  // Members API
  async getMembers(filters?: MemberFilters): Promise<ApiResponse<Member[]>> {
    const searchParams = new URLSearchParams()
    
    if (filters?.search) searchParams.append('search', filters.search)
    if (filters?.gender) searchParams.append('gender', filters.gender)
    
    const query = searchParams.toString()
    return this.request<Member[]>(`/members${query ? `?${query}` : ''}`)
  }

  async getMember(id: number): Promise<ApiResponse<Member>> {
    return this.request<Member>(`/members/${id}`)
  }

  async createMember(data: MemberFormData): Promise<ApiResponse<Member>> {
    return this.request<Member>('/members', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateMember(id: number, data: Partial<MemberFormData>): Promise<ApiResponse<Member>> {
    return this.request<Member>(`/members/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteMember(id: number): Promise<ApiResponse<void>> {
    return this.request<void>(`/members/${id}`, {
      method: 'DELETE',
    })
  }

  // Dashboard Stats API
  async getDashboardStats(): Promise<ApiResponse<any>> {
    // For now, return mock data since we haven't implemented the backend endpoint yet
    return {
      success: true,
      data: {
        totalMembers: 0,
        activePackages: 0,
        todayAttendance: 0,
        monthlyRevenue: 0
      }
    }
  }

  // Packages API (placeholder)
  async getPackages(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/packages')
  }

  // Attendance API (placeholder)
  async getTodayAttendance(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>('/attendance/today')
  }

  async checkIn(memberId: number, notes?: string): Promise<ApiResponse<any>> {
    return this.request<any>('/attendance/checkin', {
      method: 'POST',
      body: JSON.stringify({ memberId, notes }),
    })
  }
}

export const apiService = new ApiService()
export default apiService