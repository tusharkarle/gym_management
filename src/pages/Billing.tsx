import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  CircularProgress,
  InputAdornment,
  Stack,
  Avatar
} from '@mui/material'
import {
  Add as AddIcon,
  CurrencyRupee as CurrencyIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  Cancel as CancelIcon,
  Search as SearchIcon,
  Download as DownloadIcon
} from '@mui/icons-material'

interface Payment {
  id: number
  memberId: number
  memberName: string
  packageId: number
  packageName: string
  amount: number
  paymentDate: Date
  dueDate: Date
  status: 'paid'
  paymentMethod?: 'cash' | 'card' | 'upi' | 'bank_transfer'
  notes?: string
}

interface NewPayment {
  memberId: number
  packageId: number
  amount: number
  paymentMethod: 'cash' | 'card' | 'upi' | 'bank_transfer'
  notes?: string
}

export default function Renewal() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid'>('all')
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })
  const [showAddForm, setShowAddForm] = useState(false)
  const [newPayment, setNewPayment] = useState<NewPayment>({
    memberId: 0,
    packageId: 0,
    amount: 0,
    paymentMethod: 'cash',
    notes: ''
  })

  const [members] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
    { id: 4, name: 'Sarah Wilson' },
    { id: 5, name: 'David Brown' }
  ])

  const [packages] = useState([
    { id: 1, name: 'Basic Membership', price: 2000 },
    { id: 2, name: 'Premium Quarterly', price: 5500 },
    { id: 3, name: 'Premium Half-Yearly', price: 10000 },
    { id: 4, name: 'Annual Gold', price: 18000 }
  ])

  useEffect(() => {
    loadPayments()
  }, [])

  useEffect(() => {
    filterPayments()
  }, [payments, searchQuery, statusFilter, dateFilter])

  const loadPayments = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual API call
      const mockPayments: Payment[] = [
        {
          id: 1,
          memberId: 1,
          memberName: 'John Doe',
          packageId: 4,
          packageName: 'Annual Gold',
          amount: 18000,
          paymentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 360 * 24 * 60 * 60 * 1000),
          status: 'paid',
          paymentMethod: 'upi',
          notes: 'Full annual payment'
        },
        {
          id: 2,
          memberId: 2,
          memberName: 'Jane Smith',
          packageId: 3,
          packageName: 'Premium Half-Yearly',
          amount: 10000,
          paymentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 165 * 24 * 60 * 60 * 1000),
          status: 'paid',
          paymentMethod: 'card'
        },
        {
          id: 3,
          memberId: 3,
          memberName: 'Mike Johnson',
          packageId: 2,
          packageName: 'Premium Quarterly',
          amount: 5500,
          paymentDate: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          status: 'paid',
          paymentMethod: 'cash'
        },
        {
          id: 4,
          memberId: 4,
          memberName: 'Sarah Wilson',
          packageId: 1,
          packageName: 'Basic Membership',
          amount: 2000,
          paymentDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          status: 'paid',
          paymentMethod: 'cash'
        },
        {
          id: 5,
          memberId: 5,
          memberName: 'David Brown',
          packageId: 2,
          packageName: 'Premium Quarterly',
          amount: 5500,
          paymentDate: new Date(),
          dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          status: 'paid',
          paymentMethod: 'bank_transfer',
          notes: 'Online payment received'
        }
      ]

      setPayments(mockPayments)
    } catch (error) {
      console.error('Error loading payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterPayments = () => {
    let filtered = payments

    // Text search
    if (searchQuery.trim()) {
      filtered = filtered.filter(payment =>
        payment.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.packageName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter)
    }

    // Date filter
    const startDate = new Date(dateFilter.startDate)
    const endDate = new Date(dateFilter.endDate)
    endDate.setHours(23, 59, 59, 999)

    filtered = filtered.filter(payment => {
      const paymentDate = new Date(payment.paymentDate)
      return paymentDate >= startDate && paymentDate <= endDate
    })

    setFilteredPayments(filtered)
  }

  const handleAddPayment = async () => {
    if (!newPayment.memberId || !newPayment.packageId || !newPayment.amount) {
      alert('Please fill all required fields')
      return
    }

    try {
      const selectedMember = members.find(m => m.id === newPayment.memberId)
      const selectedPackage = packages.find(p => p.id === newPayment.packageId)

      if (!selectedMember || !selectedPackage) {
        alert('Invalid member or package selection')
        return
      }

      const payment: Payment = {
        id: Math.max(...payments.map(p => p.id)) + 1,
        memberId: newPayment.memberId,
        memberName: selectedMember.name,
        packageId: newPayment.packageId,
        packageName: selectedPackage.name,
        amount: newPayment.amount,
        paymentDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: 'paid',
        paymentMethod: newPayment.paymentMethod,
        notes: newPayment.notes
      }

      setPayments(prev => [payment, ...prev])
      setShowAddForm(false)
      setNewPayment({
        memberId: 0,
        packageId: 0,
        amount: 0,
        paymentMethod: 'cash',
        notes: ''
      })
      alert('Renewal processed successfully!')
    } catch (error) {
      console.error('Error adding payment:', error)
      alert('Failed to process renewal')
    }
  }

  const handlePackageChange = (packageId: number) => {
    const selectedPackage = packages.find(p => p.id === packageId)
    setNewPayment(prev => ({
      ...prev,
      packageId,
      amount: selectedPackage ? selectedPackage.price : 0
    }))
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckIcon sx={{ color: 'success.main' }} />
      default: return null
    }
  }

  const getStatusColor = (status: string): 'success' | 'default' => {
    switch (status) {
      case 'paid': return 'success'
      default: return 'default'
    }
  }

  const getPaymentMethodText = (method?: string) => {
    switch (method) {
      case 'cash': return 'Cash'
      case 'card': return 'Card'
      case 'upi': return 'UPI'
      case 'bank_transfer': return 'Bank Transfer'
      default: return '-'
    }
  }

  const exportBilling = async () => {
    try {
      alert('Exporting renewal report... (Feature to be implemented)')
    } catch (error) {
      console.error('Error exporting billing:', error)
    }
  }

  // Calculate summary stats
  const totalRevenue = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const paidPayments = filteredPayments.filter(p => p.status === 'paid')

  return (
    <Box>
      {/* Hidden buttons for triggering from header */}
      <button 
        id="billing-export-btn" 
        onClick={exportBilling}
        style={{ display: 'none' }}
      />
      <button 
        id="billing-new-btn" 
        onClick={() => setShowAddForm(true)}
        style={{ display: 'none' }}
      />
      
      <Box sx={{ p: { xs: 2, sm: 2.5, lg: 3 } }}>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} lg={6}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'success.main', width: 48, height: 48 }}>
                    <CurrencyIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Total Revenue
                    </Typography>
                    <Typography variant="h5" color="success.main" fontWeight="bold">
                      {formatCurrency(totalRevenue)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Selected period
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} lg={6}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <CheckIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Paid
                    </Typography>
                    <Typography variant="h5" color="primary.main" fontWeight="bold">
                      {paidPayments.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatCurrency(paidPayments.reduce((sum, p) => sum + p.amount, 0))}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                placeholder="Search members or renewal packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter(prev => ({ ...prev, startDate: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter(prev => ({ ...prev, endDate: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Payments Table */}
        <Paper>
          {loading ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Loading renewals...
              </Typography>
            </Box>
          ) : filteredPayments.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                No renewals found
              </Typography>
              <Button
                onClick={() => setShowAddForm(true)}
                variant="contained"
              >
                Process Your First Renewal
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Member</TableCell>
                    <TableCell>Package</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id} hover>
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
                        {payment.notes && (
                          <Typography variant="caption" color="text.secondary">
                            {payment.notes}
                          </Typography>
                        )}
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
                        <Typography variant="body2">
                          {getPaymentMethodText(payment.paymentMethod)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          {getStatusIcon(payment.status)}
                          <Chip 
                            label={payment.status} 
                            color={getStatusColor(payment.status)}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Add Payment Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="card w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Process Membership Renewal</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <CancelIcon />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member *
                  </label>
                  <select
                    value={newPayment.memberId}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, memberId: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Select Member</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package *
                  </label>
                  <select
                    value={newPayment.packageId}
                    onChange={(e) => handlePackageChange(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={0}>Select Package</option>
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name} - {formatCurrency(pkg.price)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹) *
                  </label>
                  <input
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Renewal Payment Method *
                  </label>
                  <select
                    value={newPayment.paymentMethod}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, paymentMethod: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newPayment.notes}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, notes: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any notes about this renewal..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddPayment}
                    className="btn-primary"
                  >
                    Process Renewal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Box>
  )
}