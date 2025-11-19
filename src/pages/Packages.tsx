import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
  Stack
} from '@mui/material'
import {
  People as PeopleIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'

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
    <Box>
      {/* Hidden buttons for triggering from header */}
      <button 
        id="packages-new-btn" 
        onClick={() => window.location.href = '/settings'}
        style={{ display: 'none' }}
      />
      
      <Box sx={{ p: { xs: 2, sm: 2.5, lg: 3 } }}>

        {/* Management Notice */}
        <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.50' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <SettingsIcon sx={{ color: 'primary.main' }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body1" fontWeight="medium" color="primary.main">
                Package Management Moved to Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                To add, edit, or manage membership packages, please go to Settings → Package Management
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              onClick={() => window.location.href = '/settings'}
              size="small"
            >
              Go to Settings
            </Button>
          </Stack>
        </Paper>

        {/* Package Grid - Read Only */}
        <Box sx={{ maxHeight: '75vh', overflowY: 'auto', mb: 3 }}>
          <Grid container spacing={2}>
            {packages.map((pkg) => (
              <Grid item xs={12} md={4} lg={3} key={pkg.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography variant="subtitle1" component="h3" gutterBottom>
                        {pkg.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {getDurationText(pkg.durationMonths)}
                      </Typography>
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
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PeopleIcon sx={{ mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                        Active Members: 0
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {packages.length === 0 && (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              No packages configured. 
            </Typography>
            <Button 
              variant="contained" 
              onClick={() => window.location.href = '/settings'}
              startIcon={<SettingsIcon />}
            >
              Go to Settings to Add Packages
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  )
}