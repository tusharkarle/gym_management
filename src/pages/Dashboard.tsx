import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Avatar,
  Stack,
  Chip
} from '@mui/material'
import {
  People as PeopleIcon,
  Inventory as PackageIcon,
  Today as TodayIcon,
  AttachMoney as MoneyIcon,
  PersonAdd as PersonAddIcon,
  CheckCircle as CheckIcon,
  Refresh as RefreshIcon,
  Assessment as ReportIcon,
  Warning as WarningIcon,
  Cake as CakeIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material'

interface DashboardStats {
  totalMembers: number
  activePackages: number
  todayAttendance: number
  monthlyRevenue: number
}

interface ExpiringMember {
  id: number
  name: string
  packageName: string
  expiryDate: Date
  daysLeft: number
}

interface BirthdayMember {
  id: number
  name: string
  dateOfBirth: Date
  age: number
  isToday: boolean
}

interface AttendanceTrend {
  date: string
  count: number
  day: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activePackages: 0,
    todayAttendance: 0,
    monthlyRevenue: 0
  })
  const [expiringMembers, setExpiringMembers] = useState<ExpiringMember[]>([])
  const [birthdayMembers, setBirthdayMembers] = useState<BirthdayMember[]>([])
  const [attendanceTrend, setAttendanceTrend] = useState<AttendanceTrend[]>([])

  useEffect(() => {
    // Fetch dashboard stats from API
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // TODO: Replace with actual API calls
      setStats({
        totalMembers: 150,
        activePackages: 120,
        todayAttendance: 45,
        monthlyRevenue: 85000
      })

      // Mock expiring members data
      const mockExpiringMembers: ExpiringMember[] = [
        { id: 1, name: 'John Doe', packageName: 'Premium Annual', expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), daysLeft: 2 },
        { id: 2, name: 'Sarah Wilson', packageName: 'Basic Monthly', expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), daysLeft: 5 },
        { id: 3, name: 'Mike Johnson', packageName: 'Premium Quarterly', expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), daysLeft: 1 },
        { id: 4, name: 'Emma Brown', packageName: 'Premium Half-Yearly', expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), daysLeft: 7 }
      ]
      setExpiringMembers(mockExpiringMembers)

      // Mock birthday members data
      const today = new Date()
      const mockBirthdayMembers: BirthdayMember[] = [
        { id: 1, name: 'Alice Cooper', dateOfBirth: new Date(1990, today.getMonth(), today.getDate()), age: 34, isToday: true },
        { id: 2, name: 'Bob Smith', dateOfBirth: new Date(1985, today.getMonth(), today.getDate()), age: 39, isToday: true },
        { id: 3, name: 'Carol Davis', dateOfBirth: new Date(1992, today.getMonth(), today.getDate() + 2), age: 32, isToday: false },
        { id: 4, name: 'David Lee', dateOfBirth: new Date(1988, today.getMonth(), today.getDate() + 4), age: 36, isToday: false },
        { id: 5, name: 'Eva Martinez', dateOfBirth: new Date(1995, today.getMonth(), today.getDate() + 6), age: 29, isToday: false }
      ]
      setBirthdayMembers(mockBirthdayMembers)

      // Mock attendance trend data (last 7 days)
      const mockAttendanceTrend: AttendanceTrend[] = [
        { date: '2024-11-13', count: 42, day: 'Mon' },
        { date: '2024-11-14', count: 38, day: 'Tue' },
        { date: '2024-11-15', count: 51, day: 'Wed' },
        { date: '2024-11-16', count: 45, day: 'Thu' },
        { date: '2024-11-17', count: 48, day: 'Fri' },
        { date: '2024-11-18', count: 35, day: 'Sat' },
        { date: '2024-11-19', count: 45, day: 'Sun' }
      ]
      setAttendanceTrend(mockAttendanceTrend)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  const statCards = [
    {
      name: 'Total Members',
      value: stats.totalMembers,
      icon: PeopleIcon,
      bgColor: 'primary.main',
      color: 'primary.main'
    },
    {
      name: 'Active Packages',
      value: stats.activePackages,
      icon: PackageIcon,
      bgColor: 'success.main',
      color: 'success.main'
    },
    {
      name: "Today's Attendance",
      value: stats.todayAttendance,
      icon: TodayIcon,
      bgColor: 'warning.main',
      color: 'warning.main'
    },
    {
      name: 'Monthly Revenue',
      value: `₹${stats.monthlyRevenue.toLocaleString()}`,
      icon: MoneyIcon,
      bgColor: 'secondary.main',
      color: 'secondary.main'
    }
  ]

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  const getDaysText = (days: number) => {
    if (days === 0) return 'Today'
    if (days === 1) return '1 day left'
    return `${days} days left`
  }

  const maxAttendance = Math.max(...attendanceTrend.map(d => d.count))

  return (
    <Box sx={{ height: '100vh', overflow: 'auto' }}>
      <Box sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
        {/* Enhanced Header Section */}
        <Box sx={{ 
          mb: 4, 
          p: 3, 
          bgcolor: 'background.paper', 
          borderRadius: 2, 
          border: 1, 
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 1 }}>
              Welcome back, Admin!
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Here's what's happening at your gym today
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                Active Members
              </Typography>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                {stats.activePackages}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                Today's Check-ins
              </Typography>
              <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                {stats.todayAttendance}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Grid item xs={12} sm={6} lg={3} key={card.name}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: card.bgColor, width: 48, height: 48 }}>
                        <IconComponent />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {card.name}
                        </Typography>
                        <Typography variant="h5" color={card.color} fontWeight="bold">
                          {card.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* Second Row: Quick Actions */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Quick Actions
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ width: '100%' }}>
            <Button 
              variant="contained" 
              startIcon={<PersonAddIcon />}
              onClick={() => navigate('/members')}
              size="large"
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1' }, minWidth: 150 }}
            >
              Add Member
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<CheckIcon />}
              onClick={() => navigate('/attendance')}
              size="large"
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1' }, minWidth: 150 }}
            >
              Attendance
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />}
              onClick={() => navigate('/billing')}
              size="large"
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1' }, minWidth: 150 }}
            >
              Renew Package
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<ReportIcon />}
              onClick={() => navigate('/reports')}
              size="large"
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1' }, minWidth: 150 }}
            >
              Reports
            </Button>
          </Stack>
        </Box>

        {/* Third Row: Birthday Section */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'secondary.main', display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <CakeIcon />
            Birthdays
          </Typography>
          {birthdayMembers.length > 0 ? (
            <Grid container spacing={2}>
              {birthdayMembers.map((member) => (
                <Grid item xs={12} sm={6} lg={3} key={member.id}>
                  <Card>
                    <CardContent>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar sx={{ 
                          bgcolor: member.isToday ? 'secondary.main' : 'primary.main', 
                          width: 48, 
                          height: 48 
                        }}>
                          <CakeIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            {member.isToday ? 'Today\'s Birthday!' : 'Upcoming Birthday'}
                          </Typography>
                          <Typography variant="h6" color={member.isToday ? 'secondary.main' : 'primary.main'} fontWeight="bold" noWrap>
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {member.isToday ? '🎉 Celebrate today!' : formatDate(member.dateOfBirth)}
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No birthdays this week
              </Typography>
            </Box>
          )}
        </Box>

        {/* Fourth Row: Attendance Trend Chart */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUpIcon />
            Attendance Trend (7 Days)
          </Typography>
          <Box sx={{ mt: 2, width: '100%' }}>
            {attendanceTrend.map((day, index) => (
              <Box key={day.date} sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="caption" sx={{ minWidth: 35, fontWeight: 'medium' }}>
                  {day.day}
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      height: 20,
                      bgcolor: 'primary.main',
                      borderRadius: 0.5,
                      width: `${(day.count / maxAttendance) * 100}%`,
                      minWidth: 2,
                      transition: 'width 0.3s ease'
                    }}
                  />
                  <Typography variant="caption" fontWeight="bold" sx={{ minWidth: 25 }}>
                    {day.count}
                  </Typography>
                </Box>
              </Box>
            ))}
            <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Average: {Math.round(attendanceTrend.reduce((sum, day) => sum + day.count, 0) / attendanceTrend.length)} visitors/day
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}