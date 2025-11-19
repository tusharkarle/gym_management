import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { MemberFormData } from '../../types'

interface MemberFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: MemberFormData) => Promise<void>
  initialData?: Partial<MemberFormData>
  isEditing?: boolean
}

export default function MemberForm({ isOpen, onClose, onSubmit, initialData, isEditing = false }: MemberFormProps) {
  const [formData, setFormData] = useState<MemberFormData>({
    firstName: initialData?.firstName || '',
    middleName: initialData?.middleName || '',
    lastName: initialData?.lastName || '',
    gender: initialData?.gender || 'male',
    address: initialData?.address || '',
    whatsappNo: initialData?.whatsappNo || '',
    email: initialData?.email || '',
    dateOfBirth: initialData?.dateOfBirth || '',
    profession: initialData?.profession || '',
    reference: initialData?.reference || '',
    aadharCard: initialData?.aadharCard || '',
    photoUrl: initialData?.photoUrl || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.whatsappNo.trim()) newErrors.whatsappNo = 'WhatsApp number is required'
    else if (!/^\d{10}$/.test(formData.whatsappNo.replace(/\D/g, ''))) newErrors.whatsappNo = 'WhatsApp number must be 10 digits'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.profession.trim()) newErrors.profession = 'Profession is required'
    if (!formData.aadharCard.trim()) newErrors.aadharCard = 'Aadhar card number is required'
    else if (!/^\d{12}$/.test(formData.aadharCard.replace(/\D/g, ''))) newErrors.aadharCard = 'Aadhar card must be 12 digits'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      onClose()
      // Reset form
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        gender: 'male',
        address: '',
        whatsappNo: '',
        email: '',
        dateOfBirth: '',
        profession: '',
        reference: '',
        aadharCard: '',
        photoUrl: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof MemberFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, width: '90vw', maxWidth: '1000px' }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {isEditing ? 'Edit Member' : 'Add New Member'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ maxHeight: '75vh', overflow: 'auto', p: 0 }}>
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
              Personal Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  required
                  label="First Name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  placeholder="Enter first name"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  label="Middle Name"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  placeholder="Enter middle name"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  required
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  placeholder="Enter last name"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={formData.gender}
                    label="Gender"
                    onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female' | 'other')}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  required
                  type="date"
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  placeholder="Enter email address"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  required
                  type="tel"
                  label="WhatsApp Number"
                  value={formData.whatsappNo}
                  onChange={(e) => handleInputChange('whatsappNo', e.target.value)}
                  error={!!errors.whatsappNo}
                  helperText={errors.whatsappNo}
                  placeholder="Enter WhatsApp number"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={2}
                  label="Address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  error={!!errors.address}
                  helperText={errors.address}
                  placeholder="Enter complete address"
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 600 }}>
              Additional Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Profession"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  error={!!errors.profession}
                  helperText={errors.profession}
                  placeholder="Enter profession"
                  size="small"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  fullWidth
                  required
                  label="Aadhar Card Number"
                  value={formData.aadharCard}
                  onChange={(e) => handleInputChange('aadharCard', e.target.value)}
                  error={!!errors.aadharCard}
                  helperText={errors.aadharCard}
                  placeholder="Enter 12-digit Aadhar number"
                  inputProps={{ maxLength: 12 }}
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reference"
                  value={formData.reference}
                  onChange={(e) => handleInputChange('reference', e.target.value)}
                  placeholder="Enter reference (optional)"
                  size="small"
                />
              </Grid>
            </Grid>
          </Box>

        </form>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2, justifyContent: 'center' }}>
        <Button 
          onClick={onClose} 
          variant="outlined"
          disabled={isSubmitting}
          size="large"
          sx={{ minWidth: 120 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
          size="large"
          sx={{ minWidth: 120 }}
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Member' : 'Add Member'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}