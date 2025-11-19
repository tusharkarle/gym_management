import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  Tabs,
  Tab,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Alert,
  Card,
  CardContent,
  CardActions,
  Divider,
  Stack
} from '@mui/material'
import {
  Settings as SettingsIcon,
  CurrencyRupee as CurrencyIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Description as DocumentIcon,
  Check as CheckIcon
} from '@mui/icons-material'

interface GymSettings {
  gymName: string
  address: string
  phone: string
  email: string
  website?: string
  registrationNumber?: string
}

interface FeeSettings {
  admissionFee: number
  lateFeePercentage: number
  renewalDiscountPercentage: number
  securityDeposit: number
}

interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  paymentReminders: boolean
  birthdayWishes: boolean
  attendanceAlerts: boolean
}

interface BackupSettings {
  autoBackup: boolean
  backupFrequency: 'daily' | 'weekly' | 'monthly'
  backupLocation: string
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState<'gym' | 'fees' | 'notifications' | 'backup'>('gym')
  const [gymSettings, setGymSettings] = useState<GymSettings>({
    gymName: 'FitLife Gym',
    address: '123 Fitness Street, Health City, HC 12345',
    phone: '+91 98765 43210',
    email: 'info@fitlifegym.com',
    website: 'www.fitlifegym.com',
    registrationNumber: 'GYM2024001'
  })
  
  const [feeSettings, setFeeSettings] = useState<FeeSettings>({
    admissionFee: 500,
    lateFeePercentage: 5,
    renewalDiscountPercentage: 10,
    securityDeposit: 1000
  })
  
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    paymentReminders: true,
    birthdayWishes: true,
    attendanceAlerts: false
  })
  
  const [backupSettings, setBackupSettings] = useState<BackupSettings>({
    autoBackup: true,
    backupFrequency: 'daily',
    backupLocation: '/Users/Documents/GymBackups'
  })

  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSaveSettings = async (settingsType: string) => {
    setIsSaving(true)
    try {
      // TODO: Implement API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      setSaveMessage(`${settingsType} settings saved successfully!`)
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
      setSaveMessage('Error saving settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleGymSettingsChange = (field: keyof GymSettings, value: string) => {
    setGymSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleFeeSettingsChange = (field: keyof FeeSettings, value: number) => {
    setFeeSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: keyof NotificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [field]: !prev[field] }))
  }

  const handleBackupSettingsChange = (field: keyof BackupSettings, value: any) => {
    setBackupSettings(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Box >
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
              Application Settings
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Configure gym information, fees, notifications, and security preferences
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Customize your gym management system to fit your needs
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Last updated:
            </Typography>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              {new Date().toLocaleDateString('en-IN')}
            </Typography>
          </Box>
        </Box>

        {/* Save Success Message */}
        {saveMessage && (
          <Alert 
            icon={<CheckIcon />} 
            severity="success" 
            sx={{ mb: 3 }}
          >
            {saveMessage}
          </Alert>
        )}

        {/* Tab Navigation */}
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, value) => setActiveTab(value)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              label="Gym Information" 
              value="gym" 
              icon={<BusinessIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Fee Management" 
              value="fees" 
              icon={<CurrencyIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Notifications" 
              value="notifications" 
              icon={<NotificationsIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Backup & Security" 
              value="backup" 
              icon={<SecurityIcon />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Gym Information Tab */}
        {activeTab === 'gym' && (
          <Card>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                  <BusinessIcon sx={{ mr: 1 }} />
                  Gym Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Update your gym's basic information and contact details
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    label="Gym Name"
                    value={gymSettings.gymName}
                    onChange={(e) => handleGymSettingsChange('gymName', e.target.value)}
                    placeholder="Enter gym name"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    type="tel"
                    label="Phone Number"
                    value={gymSettings.phone}
                    onChange={(e) => handleGymSettingsChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={3}
                    label="Address"
                    value={gymSettings.address}
                    onChange={(e) => handleGymSettingsChange('address', e.target.value)}
                    placeholder="Enter gym address"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    required
                    type="email"
                    label="Email Address"
                    value={gymSettings.email}
                    onChange={(e) => handleGymSettingsChange('email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="url"
                    label="Website"
                    value={gymSettings.website}
                    onChange={(e) => handleGymSettingsChange('website', e.target.value)}
                    placeholder="www.example.com"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Registration Number"
                    value={gymSettings.registrationNumber}
                    onChange={(e) => handleGymSettingsChange('registrationNumber', e.target.value)}
                    placeholder="Business registration number"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => handleSaveSettings('Gym information')}
                  disabled={isSaving}
                  variant="contained"
                  size="large"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Fee Management Tab */}
        {activeTab === 'fees' && (
          <Card>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                  <CurrencyIcon sx={{ mr: 1 }} />
                  Fee Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure admission fees, late fees, and other charges
                </Typography>
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Admission Fee (₹)"
                    value={feeSettings.admissionFee}
                    onChange={(e) => handleFeeSettingsChange('admissionFee', parseFloat(e.target.value) || 0)}
                    InputProps={{ inputProps: { min: 0 } }}
                    helperText="One-time fee charged for new member registration"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Security Deposit (₹)"
                    value={feeSettings.securityDeposit}
                    onChange={(e) => handleFeeSettingsChange('securityDeposit', parseFloat(e.target.value) || 0)}
                    InputProps={{ inputProps: { min: 0 } }}
                    helperText="Refundable security deposit"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Late Fee Percentage (%)"
                    value={feeSettings.lateFeePercentage}
                    onChange={(e) => handleFeeSettingsChange('lateFeePercentage', parseFloat(e.target.value) || 0)}
                    InputProps={{ inputProps: { min: 0, max: 100, step: 0.1 } }}
                    helperText="Percentage charged on overdue payments"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Renewal Discount (%)"
                    value={feeSettings.renewalDiscountPercentage}
                    onChange={(e) => handleFeeSettingsChange('renewalDiscountPercentage', parseFloat(e.target.value) || 0)}
                    InputProps={{ inputProps: { min: 0, max: 100, step: 0.1 } }}
                    helperText="Discount for early renewals"
                  />
                </Grid>
              </Grid>

              {/* Fee Summary */}
              <Paper sx={{ mt: 4, p: 3, bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  Fee Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Admission Fee
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        {formatCurrency(feeSettings.admissionFee)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Security Deposit
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                        {formatCurrency(feeSettings.securityDeposit)}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Late Fee
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'error.main', fontWeight: 'bold' }}>
                        {feeSettings.lateFeePercentage}%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Renewal Discount
                      </Typography>
                      <Typography variant="h6" sx={{ color: 'warning.main', fontWeight: 'bold' }}>
                        {feeSettings.renewalDiscountPercentage}%
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => handleSaveSettings('Fee')}
                  disabled={isSaving}
                  variant="contained"
                  size="large"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <NotificationsIcon className="h-5 w-5 mr-2" />
                Notification Settings
              </h3>
              <p className="text-sm text-gray-500 mt-1">Configure how you want to receive notifications</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={() => handleNotificationChange('emailNotifications')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={() => handleNotificationChange('smsNotifications')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Payment Reminders</h4>
                    <p className="text-sm text-gray-500">Send reminders for upcoming payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.paymentReminders}
                      onChange={() => handleNotificationChange('paymentReminders')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Birthday Wishes</h4>
                    <p className="text-sm text-gray-500">Send birthday wishes to members</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.birthdayWishes}
                      onChange={() => handleNotificationChange('birthdayWishes')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Attendance Alerts</h4>
                    <p className="text-sm text-gray-500">Get alerts for irregular attendance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.attendanceAlerts}
                      onChange={() => handleNotificationChange('attendanceAlerts')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSaveSettings('Notification')}
                  disabled={isSaving}
                  className="btn-primary"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Backup & Security Tab */}
        {activeTab === 'backup' && (
          <div className="card">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <SecurityIcon className="h-5 w-5 mr-2" />
                Backup & Security
              </h3>
              <p className="text-sm text-gray-500 mt-1">Configure data backup and security settings</p>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Automatic Backup</h4>
                    <p className="text-sm text-gray-500">Automatically backup your data</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={backupSettings.autoBackup}
                      onChange={() => handleBackupSettingsChange('autoBackup', !backupSettings.autoBackup)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Frequency
                  </label>
                  <select
                    value={backupSettings.backupFrequency}
                    onChange={(e) => handleBackupSettingsChange('backupFrequency', e.target.value)}
                    disabled={!backupSettings.autoBackup}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Location
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={backupSettings.backupLocation}
                      onChange={(e) => handleBackupSettingsChange('backupLocation', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Select backup folder"
                    />
                    <button className="px-4 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-300">
                      Browse
                    </button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Manual Backup</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Create an immediate backup of all your gym data including members, payments, and settings.
                  </p>
                  <button className="btn-secondary">
                    <DocumentIcon className="h-4 w-4 mr-2" />
                    Create Backup Now
                  </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-900 mb-2">Data Export</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    Export your data in various formats for external use or migration.
                  </p>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-sm">
                      Export as Excel
                    </button>
                    <button className="btn-secondary text-sm">
                      Export as CSV
                    </button>
                    <button className="btn-secondary text-sm">
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleSaveSettings('Backup')}
                  disabled={isSaving}
                  className="btn-primary"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Box>
  )
}