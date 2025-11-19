import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { PackageFormData } from '../../types'

interface PackageFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PackageFormData) => Promise<void>
  initialData?: Partial<PackageFormData>
  isEditing?: boolean
}

export default function PackageForm({ isOpen, onClose, onSubmit, initialData, isEditing = false }: PackageFormProps) {
  const [formData, setFormData] = useState<PackageFormData>({
    name: initialData?.name || '',
    durationMonths: initialData?.durationMonths || 1,
    price: initialData?.price || 0,
    description: initialData?.description || '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Package name is required'
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0'

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
        name: '',
        durationMonths: 1,
        price: 0,
        description: '',
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof PackageFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {isEditing ? 'Edit Package Fees' : 'Add New Package'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          {!isEditing && (
            <TextField
              fullWidth
              required
              label="Package Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              placeholder="e.g., Basic Membership"
              sx={{ mb: 3 }}
            />
          )}

          {!isEditing && (
            <TextField
              fullWidth
              select
              required
              label="Duration"
              value={formData.durationMonths}
              onChange={(e) => handleInputChange('durationMonths', parseInt(e.target.value) as 1 | 3 | 6 | 12)}
              SelectProps={{ native: true }}
              sx={{ mb: 3 }}
            >
              <option value={1}>1 Month</option>
              <option value={3}>3 Months</option>
              <option value={6}>6 Months</option>
              <option value={12}>12 Months</option>
            </TextField>
          )}

          <TextField
            fullWidth
            required
            type="number"
            label="Price (₹)"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            error={!!errors.price}
            helperText={errors.price}
            placeholder="Enter package price"
            InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter package description (optional)"
            sx={{ mb: 3 }}
          />

        </form>
      </DialogContent>
      
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Fees' : 'Add Package'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}