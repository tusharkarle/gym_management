import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Chip,
  CircularProgress,
  Stack,
  Avatar
} from '@mui/material'
import {
  BarChart as ChartIcon,
  People as PeopleIcon,
  CurrencyRupee as CurrencyIcon,
  CalendarToday as CalendarIcon,
  Download as DownloadIcon
} from '@mui/icons-material'

interface ReportData {
  totalMembers: number
  activeMembers: number
  monthlyRevenue: number
  dailyAttendance: number
  popularPackages: Array<{
    name: string
    count: number
    revenue: number
  }>
  revenueByMonth: Array<{
    month: string
    revenue: number
    members: number
  }>
  attendanceByDay: Array<{
    date: string
    count: number
  }>
}

interface AttendanceReport {
  memberId: number
  memberName: string
  totalDays: number
  lastVisit: Date
  packageName: string
}

interface PaymentReport {
  memberId: number
  memberName: string
  packageName: string
  amount: number
  paymentDate: Date
  dueDate: Date
  status: 'paid' | 'due' | 'overdue'
}

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [attendanceReports, setAttendanceReports] = useState<AttendanceReport[]>([])
  const [paymentReports, setPaymentReports] = useState<PaymentReport[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'payments'>('overview')

  useEffect(() => {
    loadReportData()
  }, [dateRange])

  const loadReportData = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API calls
      // Mock data for demonstration
      const mockData: ReportData = {
        totalMembers: 156,
        activeMembers: 142,
        monthlyRevenue: 284000,
        dailyAttendance: 45,
        popularPackages: [
          { name: 'Annual Gold', count: 45, revenue: 810000 },
          { name: 'Premium Half-Yearly', count: 38, revenue: 380000 },
          { name: 'Premium Quarterly', count: 32, revenue: 176000 },
          { name: 'Basic Membership', count: 41, revenue: 82000 }
        ],
        revenueByMonth: [
          { month: 'Oct', revenue: 245000, members: 12 },
          { month: 'Nov', revenue: 284000, members: 18 },
          { month: 'Dec', revenue: 320000, members: 22 }
        ],
        attendanceByDay: [
          { date: '2024-11-15', count: 42 },
          { date: '2024-11-16', count: 38 },
          { date: '2024-11-17', count: 45 },
          { date: '2024-11-18', count: 41 }
        ]
      }

      const mockAttendance: AttendanceReport[] = [
        {
          memberId: 1,
          memberName: 'John Doe',
          totalDays: 25,
          lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          packageName: 'Annual Gold'
        },
        {
          memberId: 2,
          memberName: 'Jane Smith',
          totalDays: 18,
          lastVisit: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          packageName: 'Premium Half-Yearly'
        },
        {
          memberId: 3,
          memberName: 'Mike Johnson',
          totalDays: 22,
          lastVisit: new Date(),
          packageName: 'Premium Quarterly'
        }
      ]

      const mockPayments: PaymentReport[] = [
        {
          memberId: 1,
          memberName: 'John Doe',
          packageName: 'Annual Gold',
          amount: 18000,
          paymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
          status: 'paid'
        },
        {
          memberId: 4,
          memberName: 'Sarah Wilson',
          packageName: 'Basic Membership',
          amount: 2000,
          paymentDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          status: 'overdue'
        },
        {
          memberId: 5,
          memberName: 'David Brown',
          packageName: 'Premium Quarterly',
          amount: 5500,
          paymentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
          status: 'paid'
        }
      ]

      setReportData(mockData)
      setAttendanceReports(mockAttendance)
      setPaymentReports(mockPayments)
    } catch (error) {
      console.error('Error loading report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(date))
  }

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'paid': return 'success'
      case 'due': return 'warning'
      case 'overdue': return 'error'
      default: return 'default'
    }
  }

  const exportReport = async (type: 'overview' | 'attendance' | 'payments') => {
    try {
      // TODO: Implement Excel export for reports
      alert(`Exporting ${type} report... (Feature to be implemented)`)
    } catch (error) {
      console.error('Error exporting report:', error)
      alert('Failed to export report')
    }
  }

  if (loading) {
    return (
      <Box >
        <Box sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 256 }}>
            <CircularProgress sx={{ mr: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Loading reports...
            </Typography>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box>
      {/* Hidden buttons for triggering from header */}
      <button 
        id="reports-export-btn" 
        onClick={() => exportReport(activeTab)}
        style={{ display: 'none' }}
      />
      
      <Box sx={{ p: { xs: 2, sm: 2.5, lg: 3 } }}>

        {/* Date Range Filter */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ flexWrap: 'wrap' }}>
              <CalendarIcon sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" fontWeight="medium">
                Date Range:
              </Typography>
              <TextField
                type="date"
                size="small"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
              <Typography variant="body2" color="text.secondary">
                to
              </Typography>
              <TextField
                type="date"
                size="small"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
          </Box>
        </Paper>

        {/* Tab Navigation */}
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, value) => setActiveTab(value)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Overview" value="overview" />
            <Tab label="Attendance Report" value="attendance" />
            <Tab label="Payment Report" value="payments" />
          </Tabs>
        </Box>

        {/* Overview Tab */}
        {activeTab === 'overview' && reportData && (
          <Stack spacing={3}>
            {/* Key Metrics */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={3}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                        <PeopleIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Total Members
                        </Typography>
                        <Typography variant="h5" color="primary.main" fontWeight="bold">
                          {reportData.totalMembers}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reportData.activeMembers} active
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48 }}>
                        <CurrencyIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Monthly Revenue
                        </Typography>
                        <Typography variant="h5" color="success.main" fontWeight="bold">
                          {formatCurrency(reportData.monthlyRevenue)}
                        </Typography>
                        <Typography variant="caption" color="success.main">
                          +12% from last month
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'warning.main', width: 48, height: 48 }}>
                        <ChartIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Daily Attendance
                        </Typography>
                        <Typography variant="h5" color="warning.main" fontWeight="bold">
                          {reportData.dailyAttendance}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Today's check-ins
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} lg={3}>
                <Card>
                  <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48 }}>
                        <CalendarIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Avg. Monthly Visits
                        </Typography>
                        <Typography variant="h5" color="secondary.main" fontWeight="bold">
                          18.5
                        </Typography>
                        <Typography variant="caption" color="secondary.main">
                          Per active member
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Popular Packages */}
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Card>
                  <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="semibold">
                      Popular Packages
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      {reportData.popularPackages.map((pkg, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {pkg.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {pkg.count} members
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body1" fontWeight="medium" color="success.main">
                              {formatCurrency(pkg.revenue)}
                            </Typography>
                            <Box sx={{ width: 96, bgcolor: 'grey.200', borderRadius: 1, height: 8, mt: 0.5 }}>
                              <Box
                                sx={{
                                  bgcolor: 'primary.main',
                                  height: 8,
                                  borderRadius: 1,
                                  width: `${(pkg.count / 50) * 100}%`
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Card>
                  <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                    <Typography variant="h6" fontWeight="semibold">
                      Revenue Trend
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Stack spacing={2}>
                      {reportData.revenueByMonth.map((month, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {month.month} 2024
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {month.members} new members
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body1" fontWeight="medium" color="primary.main">
                              {formatCurrency(month.revenue)}
                            </Typography>
                            <Box sx={{ width: 128, bgcolor: 'grey.200', borderRadius: 1, height: 8, mt: 0.5 }}>
                              <Box
                                sx={{
                                  bgcolor: 'success.main',
                                  height: 8,
                                  borderRadius: 1,
                                  width: `${(month.revenue / 350000) * 100}%`
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        )}

        {/* Attendance Report Tab */}
        {activeTab === 'attendance' && (
          <Card>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight="semibold" gutterBottom>
                Member Attendance Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track member visit frequency and engagement
              </Typography>
            </Box>
            <TableContainer>
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
                        Package
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Total Visits
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Last Visit
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Frequency
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceReports.map((report, index) => (
                    <TableRow key={report.memberId} sx={{ bgcolor: index % 2 === 0 ? 'white' : 'grey.50' }}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {report.memberName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {report.memberId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {report.packageName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {report.totalDays} days
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            This month
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(report.lastVisit)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.totalDays > 20 ? 'Excellent' : report.totalDays > 10 ? 'Good' : 'Low'}
                          color={report.totalDays > 20 ? 'success' : report.totalDays > 10 ? 'warning' : 'error'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}

        {/* Payment Report Tab */}
        {activeTab === 'payments' && (
          <Card>
            <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6" fontWeight="semibold" gutterBottom>
                Payment Collection Report
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track payments, dues, and revenue collection
              </Typography>
            </Box>
            <TableContainer>
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
                        Package
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Amount
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Payment Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Due Date
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption" fontWeight="medium" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Status
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentReports.map((payment, index) => (
                    <TableRow key={`${payment.memberId}-${payment.paymentDate}`} sx={{ bgcolor: index % 2 === 0 ? 'white' : 'grey.50' }}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {payment.memberName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {payment.memberId}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {payment.packageName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {formatCurrency(payment.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(payment.paymentDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(payment.dueDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status}
                          color={getStatusColor(payment.status)}
                          variant="outlined"
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}
      </Box>
    </Box>
  )
}