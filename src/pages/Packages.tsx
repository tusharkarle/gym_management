import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Chip,
  Divider,
  Stack
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as PeopleIcon
} from '@mui/icons-material'
import PackageForm from '../components/forms/PackageForm'
import { PackageFormData } from '../types'

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

export default function Packages() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingPackage, setEditingPackage] = useState<Package | null>(null)
  const [packages, setPackages] = useState<Package[]>([
    // Mock data for development
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
  const [loading, setLoading] = useState(false)

  const handleAddPackage = async (data: PackageFormData) => {
    try {
      // TODO: Replace with API call
      const newPackage: Package = {
        id: Math.max(...packages.map(p => p.id)) + 1,
        ...data,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setPackages(prev => [...prev, newPackage])
      setShowAddForm(false)
      alert('Package added successfully!')
    } catch (error) {
      console.error('Error adding package:', error)
      alert('Error adding package. Please try again.')
    }
  }

  const handleEditPackage = async (data: PackageFormData) => {
    if (!editingPackage) return
    
    try {
      // TODO: Replace with API call
      const updatedPackage = {
        ...editingPackage,
        ...data,
        updatedAt: new Date()
      }
      setPackages(prev => prev.map(p => p.id === editingPackage.id ? updatedPackage : p))
      setEditingPackage(null)
      alert('Package updated successfully!')
    } catch (error) {
      console.error('Error updating package:', error)
      alert('Error updating package. Please try again.')
    }
  }

  const handleDeletePackage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this package?')) return
    
    try {
      // TODO: Replace with API call
      setPackages(prev => prev.filter(p => p.id !== id))
      alert('Package deleted successfully!')
    } catch (error) {
      console.error('Error deleting package:', error)
      alert('Error deleting package. Please try again.')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price)
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
              Membership Packages
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              Configure and manage your gym membership plans
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {packages.length} active packages • Monthly revenue potential: ₹{packages.reduce((sum, pkg) => sum + (pkg.price * (pkg.durationMonths === 1 ? 1 : pkg.price / pkg.durationMonths)), 0).toLocaleString()}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="text.secondary">
                Most Popular
              </Typography>
              <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Premium Quarterly
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAddForm(true)}
              size="medium"
            >
              Add Package
            </Button>
          </Box>
        </Box>

        {/* Package Grid */}
        <Box sx={{ maxHeight: '75vh', overflowY: 'auto', mb: 3 }}>
          <Grid container spacing={2}>
            {packages.map((pkg) => (
              <Grid item xs={12} md={4} lg={3} key={pkg.id}>
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
                        title="Edit Package Fees"
                      >
                        <EditIcon />
                      </IconButton>
                    </Stack>
                  </Box>

                  <Box sx={{ mb: 1.5 }}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      {formatPrice(pkg.price)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatPrice(getMonthlyRate(pkg.price, pkg.durationMonths))}/month
                    </Typography>
                  </Box>

                  {pkg.description && (
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: 'block' }}>
                      {pkg.description}
                    </Typography>
                  )}
                </CardContent>
                
                <CardActions sx={{ justifyContent: 'center', px: 2, pb: 1.5, pt: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon sx={{ mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                      Active Members: 0
                    </Typography>
                  </Box>
                </CardActions>
              </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {packages.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No packages configured. Contact administrator to set up membership packages.
            </Typography>
          </Paper>
        )}


        {/* Add Package Form */}
        <PackageForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
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