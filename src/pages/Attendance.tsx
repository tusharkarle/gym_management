import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  CircularProgress,
  Stack
} from '@mui/material'
import {
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  Person as PersonIcon
} from '@mui/icons-material'
import CheckInForm from '../components/forms/CheckInForm'

interface AttendanceRecord {
  id: number
  memberId: number
  memberName: string
  checkInTime: Date
  notes?: string
}

export default function Attendance() {
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord[]>([
    // Mock data for demonstration
    {
      id: 1,
      memberId: 1,
      memberName: 'John Doe',
      checkInTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      memberId: 2,
      memberName: 'Jane Smith',
      checkInTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      notes: 'Personal training session'
    },
    {
      id: 3,
      memberId: 3,
      memberName: 'Mike Johnson',
      checkInTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    }
  ])

  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAttendanceHistory()
  }, [selectedDate])

  const loadAttendanceHistory = async () => {
    setLoading(true)
    try {
      // TODO: Replace with API call
      // Mock historical data
      const mockHistory: AttendanceRecord[] = []
      const selectedDateObj = new Date(selectedDate)
      
      // Generate mock data for selected date
      if (selectedDate === new Date().toISOString().split('T')[0]) {
        // Today's data
        setAttendanceHistory(todayAttendance)
      } else {
        // Generate mock historical data
        for (let i = 0; i < Math.floor(Math.random() * 15) + 5; i++) {
          mockHistory.push({
            id: i + 100,
            memberId: i + 1,
            memberName: `Member ${i + 1}`,
            checkInTime: new Date(selectedDateObj.getTime() + Math.random() * 12 * 60 * 60 * 1000),
          })
        }
        setAttendanceHistory(mockHistory)
      }
    } catch (error) {
      console.error('Error loading attendance history:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckIn = async (memberId: number, notes?: string) => {
    try {
      // TODO: Replace with API call
      const newRecord: AttendanceRecord = {
        id: Date.now(),
        memberId,
        memberName: `Member ${memberId}`, // This would come from the API
        checkInTime: new Date(),
        notes,
      }

      setTodayAttendance(prev => [newRecord, ...prev])
      
      // If viewing today's attendance, update the history as well
      if (selectedDate === new Date().toISOString().split('T')[0]) {
        setAttendanceHistory(prev => [newRecord, ...prev])
      }

      alert('Check-in recorded successfully!')
    } catch (error) {
      console.error('Error recording check-in:', error)
      alert('Failed to record check-in. Please try again.')
    }
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date))
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date))
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
  }

  const isToday = selectedDate === new Date().toISOString().split('T')[0]

  return (
    <Box sx={{ height: '100vh', overflow: 'auto' }}>
      <Box sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Attendance
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track member check-ins and attendance records
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Quick Check-in Form */}
          <Grid item xs={12} lg={4}>
            <CheckInForm onCheckIn={handleCheckIn} />
          </Grid>

          {/* Today's Stats */}
          <Grid item xs={12} lg={8}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                        <PersonIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Today's Check-ins
                        </Typography>
                        <Typography variant="h5" color="primary.main" fontWeight="bold">
                          {todayAttendance.length}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'success.main', width: 40, height: 40 }}>
                        <ClockIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Peak Hour
                        </Typography>
                        <Typography variant="h5" color="success.main" fontWeight="bold">
                          6-8 PM
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'warning.main', width: 40, height: 40 }}>
                        <CalendarIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          This Week
                        </Typography>
                        <Typography variant="h5" color="warning.main" fontWeight="bold">
                          127
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Today's Recent Check-ins */}
            <Card>
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="h6" fontWeight="semibold">
                  Recent Check-ins
                </Typography>
              </Box>
              <Box sx={{ maxHeight: 320, overflow: 'auto' }}>
                {todayAttendance.length === 0 ? (
                  <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No check-ins recorded yet today
                    </Typography>
                  </Box>
                ) : (
                  <List disablePadding>
                    {todayAttendance.slice(0, 10).map((record) => (
                      <ListItem key={record.id} divider>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 32, height: 32 }}>
                            {record.memberName.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={record.memberName}
                          secondary={record.notes}
                          primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight="medium">
                            {formatTime(record.checkInTime)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {getTimeAgo(record.checkInTime)}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </Card>
          </Grid>
        </Grid>

        {/* Attendance History */}
        <Card>
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="h6" fontWeight="semibold">
                Attendance History
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarIcon sx={{ color: 'text.secondary' }} />
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  size="small"
                  sx={{ minWidth: 150 }}
                />
              </Box>
            </Box>
          </Box>

          <TableContainer>
            {loading ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <CircularProgress sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Loading attendance records...
                </Typography>
              </Box>
            ) : attendanceHistory.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No attendance records found for {formatDate(new Date(selectedDate))}
                </Typography>
              </Box>
            ) : (
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Member
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Check-in Time
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Notes
                      </Typography>
                    </TableCell>
                    {isToday && (
                      <TableCell>
                        <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Time Ago
                        </Typography>
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceHistory.map((record, index) => (
                    <TableRow key={record.id} sx={{ bgcolor: index % 2 === 0 ? 'white' : 'grey.50' }}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 32, height: 32 }}>
                            {record.memberName.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {record.memberName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              ID: {record.memberId}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2">
                            {formatTime(record.checkInTime)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(record.checkInTime)}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {record.notes || '-'}
                        </Typography>
                      </TableCell>
                      {isToday && (
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {getTimeAgo(record.checkInTime)}
                          </Typography>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          {/* Pagination placeholder */}
          {attendanceHistory.length > 0 && (
            <Box sx={{ px: 3, py: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Showing {attendanceHistory.length} records for {formatDate(new Date(selectedDate))}
              </Typography>
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  )
}