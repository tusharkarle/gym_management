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
    <Box sx={{ p: { xs: 2, sm: 2.5, lg: 3 } }}>
      {/* Stats Grid */}
      <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <Card>
              <CardContent sx={{ p: 2.5 }}> {/* Increased padding */}
                <Stack direction="row" alignItems="center" spacing={2}> {/* Increased spacing */}
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}> {/* Increased size */}
                    <PeopleIcon sx={{ fontSize: '1.4rem' }} /> {/* Larger icon */}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'block' }}> {/* Increased from caption */}
                      Total Members
                    </Typography>
                    <Typography variant="h5" color="primary.main" fontWeight="bold"> {/* Increased back to h5 */}
                      {stats.totalMembers}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48 }}>
                    <CheckIcon sx={{ fontSize: '1.4rem' }} />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'block' }}>
                      Active Members
                    </Typography>
                    <Typography variant="h5" color="success.main" fontWeight="bold">
                      {stats.activePackages}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48 }}>
                    <TodayIcon sx={{ fontSize: '1.4rem' }} />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'block' }}>
                      Today's Check-ins
                    </Typography>
                    <Typography variant="h5" color="warning.main" fontWeight="bold">
                      {stats.todayAttendance}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Card>
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48 }}>
                    <MoneyIcon sx={{ fontSize: '1.4rem' }} />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom sx={{ display: 'block' }}>
                      Monthly Revenue
                    </Typography>
                    <Typography variant="h5" color="secondary.main" fontWeight="bold">
                      ₹{stats.monthlyRevenue.toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

      {/* Quick Actions Section */}
      <Box sx={{ 
        mb: 3, 
        p: 2.5, 
        bgcolor: 'background.paper', 
        borderRadius: 2, 
        border: 1, 
        borderColor: 'divider',
        boxShadow: 1
      }}>
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between" 
          flexWrap="wrap" 
          gap={2}
          sx={{ width: '100%' }}
        >
          <Typography 
            variant="subtitle1" 
            component="h2" 
            sx={{ 
              color: 'text.primary',
              fontWeight: 600,
              flexShrink: 0
            }}
          >
            Quick Actions
          </Typography>
          <Stack direction="row" spacing={1.5} flexWrap="wrap" sx={{ flex: 1, justifyContent: 'flex-end' }}>
            <Button 
              variant="outlined" 
              startIcon={<PersonAddIcon sx={{ fontSize: '1rem' }} />}
              onClick={() => navigate('/members')}
              size="small"
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1' }, minWidth: 120 }}
            >
              Add Member
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<CheckIcon sx={{ fontSize: '1rem' }} />}
              onClick={() => navigate('/attendance')}
              size="small"
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1' }, minWidth: 120 }}
            >
              Attendance
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon sx={{ fontSize: '1rem' }} />}
              onClick={() => navigate('/billing')}
              size="small"
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1' }, minWidth: 120 }}
            >
              Renew Package
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<ReportIcon sx={{ fontSize: '1rem' }} />}
              onClick={() => navigate('/reports')}
              size="small"
              sx={{ flex: { xs: '1 1 100%', sm: '1 1 auto', md: '1' }, minWidth: 120 }}
            >
              Reports
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Birthday Section */}
      <Box sx={{ 
        mb: 3, 
        p: 2.5, 
        bgcolor: 'background.paper', 
        borderRadius: 2, 
        border: 1, 
        borderColor: 'divider',
        boxShadow: 1
      }}>
        <Typography 
          variant="subtitle1" 
          component="h2" 
          gutterBottom 
          sx={{ 
            color: 'secondary.main', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            mb: 2,
            fontWeight: 600
          }}
        >
          <CakeIcon sx={{ fontSize: '1.2rem' }} />
          Birthdays
        </Typography>
        {birthdayMembers.length > 0 ? (
          <Grid container spacing={2}>
            {birthdayMembers.map((member) => (
              <Grid item xs={12} sm={6} lg={3} key={member.id}>
                  <Card>
                    <CardContent sx={{ py: 1.5, px: 1.5 }}> {/* Reduced padding */}
                      <Stack direction="row" alignItems="center" spacing={1.5}> {/* Reduced spacing */}
                        <Avatar sx={{ 
                          bgcolor: member.isToday ? 'secondary.main' : 'primary.main', 
                          width: 36, 
                          height: 36 
                        }}> {/* Reduced avatar size */}
                          <CakeIcon sx={{ fontSize: '1.1rem' }} /> {/* Smaller icon */}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="caption" color="text.secondary" gutterBottom sx={{ display: 'block' }}>
                            {member.isToday ? 'Today\'s Birthday!' : 'Upcoming Birthday'}
                          </Typography>
                          <Typography variant="body2" color={member.isToday ? 'secondary.main' : 'primary.main'} fontWeight="bold" noWrap> {/* Reduced from h6 to body2 */}
                            {member.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.625rem' }}> {/* Even smaller text */}
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
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No birthdays this week
            </Typography>
          </Box>
        )}
        </Box>

      {/* Attendance Trend Section */}
      <Box sx={{ 
        mb: 3, 
        p: 2.5, 
        bgcolor: 'background.paper', 
        borderRadius: 2, 
        border: 1, 
        borderColor: 'divider',
        boxShadow: 1
      }}>
        <Typography 
          variant="subtitle1" 
          component="h2" 
          gutterBottom 
          sx={{ 
            color: 'primary.main', 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            mb: 1.5,
            fontWeight: 600
          }}
        >
          <TrendingUpIcon sx={{ fontSize: '1.2rem' }} />
          Attendance Trend (7 Days)
        </Typography>
        <Box sx={{ mt: 2, width: '100%' }}>
          {attendanceTrend.map((day, index) => (
            <Box key={day.date} sx={{ mb: 1.2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="caption" sx={{ minWidth: 35, fontWeight: 'medium' }}>
                  {day.day}
                </Typography>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      height: 16, // Reduced height for consistency
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
          <Box sx={{ mt: 1.5, p: 1.5, bgcolor: 'grey.50', borderRadius: 1 }}> {/* Consistent padding */}
              <Typography variant="caption" color="text.secondary">
                Average: {Math.round(attendanceTrend.reduce((sum, day) => sum + day.count, 0) / attendanceTrend.length)} visitors/day
              </Typography>
            </Box>
          </Box>
        </Box>
    </Box>
  )
}