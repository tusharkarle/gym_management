import { useState, useEffect } from 'react'
import { env } from '../config/env'
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
  Stack,
  IconButton,
  Chip
} from '@mui/material'
import {
  Settings as SettingsIcon,
  CurrencyRupee as CurrencyIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Description as DocumentIcon,
  Check as CheckIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon
} from '@mui/icons-material'
import PackageForm from '../components/forms/PackageForm'
import { PackageFormData } from '../types'

interface GymSettings {
  gymName: string
  address: string
  phone: string
  email: string
  website?: string
  registrationNumber?: string
}

interface Package {
  id: number
  name: string
  durationMonths: 1 | 3 | 6 | 12
  price: number
  description?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
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
  const [activeTab, setActiveTab] = useState<'gym' | 'packages' | 'notifications' | 'backup'>('gym')
  const [gymSettings, setGymSettings] = useState<GymSettings>({
    gymName: env.gymName,
    address: '123 Fitness Street, Health City, HC 12345',
    phone: env.gymContactPhone,
    email: env.gymContactEmail,
    website: 'www.aimsfitness.com',
    registrationNumber: 'AFC2024001'
  })
  
  const [packages, setPackages] = useState<Package[]>([
    {
      id: 1,
      name: "Basic Membership",
      durationMonths: 1,
      price: 2000,
      description: "Access to gym equipment and basic facilities",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      name: "Premium Quarterly",
      durationMonths: 3,
      price: 5500,
      description: "3-month package with personal trainer sessions",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: "Premium Half-Yearly",
      durationMonths: 6,
      price: 10000,
      description: "6-month package with full access and diet consultation",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      name: "Annual Gold",
      durationMonths: 12,
      price: 18000,
      description: "Complete annual package with all amenities",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  
  const [showAddPackageForm, setShowAddPackageForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  
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
    backupLocation: `/Users/Documents/${env.gymName}Backups`
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

  const handleAddPackage = async (data: PackageFormData) => {
    try {
      const newPackage: Package = {
        id: Math.max(...packages.map(p => p.id)) + 1,
        ...data,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setPackages(prev => [...prev, newPackage])
      setShowAddPackageForm(false)
      setSaveMessage('Package added successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error adding package:', error)
      setSaveMessage('Error adding package')
    }
  }

  const handleEditPackage = async (data: PackageFormData) => {
    if (!editingPackage) return
    
    try {
      const updatedPackage = {
        ...editingPackage,
        ...data,
        updatedAt: new Date()
      }
      setPackages(prev => prev.map(p => p.id === editingPackage.id ? updatedPackage : p))
      setEditingPackage(null)
      setSaveMessage('Package updated successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error updating package:', error)
      setSaveMessage('Error updating package')
    }
  }

  const handleDeletePackage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this package?')) return
    
    try {
      setPackages(prev => prev.filter(p => p.id !== id))
      setSaveMessage('Package deleted successfully!')
      setTimeout(() => setSaveMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting package:', error)
      setSaveMessage('Error deleting package')
    }
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

  const getDurationText = (months: number) => {
    if (months === 1) return '1 Month'
    if (months < 12) return `${months} Months`
    return `${months / 12} Year${months > 12 ? 's' : ''}`
  }

  const getMonthlyRate = (price: number, months: number) => {
    return price / months
  }

  return (
    <Box>
      <Box sx={{ p: { xs: 2, sm: 2.5, lg: 3 } }}>

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
              label="Package Management" 
              value="packages" 
              icon={<CurrencyIcon />}
              iconPosition="start"
            />
            <Tab 
              label="Notifications" 
              value="notifications" 
              icon={<NotificationsIcon />}
              iconPosition="start"
              disabled
            />
            <Tab 
              label="Backup & Security" 
              value="backup" 
              icon={<SecurityIcon />}
              iconPosition="start"
              disabled
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

        {/* Package Management Tab */}
        {activeTab === 'packages' && (
          <Card>
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'primary.main' }}>
                  <CurrencyIcon sx={{ mr: 1 }} />
                  Package Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage membership packages and pricing
                </Typography>
              </Box>
              

              <Grid container spacing={3}>
                {packages.map((pkg) => (
                  <Grid item xs={12} md={6} lg={4} key={pkg.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                          <Box>
                            <Typography variant="subtitle1" component="h3" gutterBottom>
                              {pkg.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {getDurationText(pkg.durationMonths)}
                            </Typography>
                          </Box>
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              onClick={() => setEditingPackage(pkg)}
                              size="small"
                              color="primary"
                              title="Edit Package"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeletePackage(pkg.id)}
                              size="small"
                              color="error"
                              title="Delete Package"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        </Box>

                        <Box sx={{ mb: 1.5 }}>
                          <Typography variant="h5" color="primary" fontWeight="bold">
                            {formatCurrency(pkg.price)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatCurrency(getMonthlyRate(pkg.price, pkg.durationMonths))}/month
                          </Typography>
                        </Box>

                        {pkg.description && (
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                            {pkg.description}
                          </Typography>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Chip
                            label={pkg.isActive ? 'Active' : 'Inactive'}
                            color={pkg.isActive ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {packages.length === 0 && (
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.secondary">
                    No packages configured yet.
                  </Typography>
                </Paper>
              )}
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

        {/* Add Package Form */}
        <PackageForm
          isOpen={showAddPackageForm}
          onClose={() => setShowAddPackageForm(false)}
          onSubmit={handleAddPackage}
        />

        {/* Edit Package Form */}
        {editingPackage && (
          <PackageForm
            isOpen={true}
            onClose={() => setEditingPackage(null)}
            onSubmit={handleEditPackage}
            initialData={{
              name: editingPackage.name,
              durationMonths: editingPackage.durationMonths,
              price: editingPackage.price,
              description: editingPackage.description,
            }}
            isEditing={true}
          />
        )}
      </Box>
    </Box>
  )
}