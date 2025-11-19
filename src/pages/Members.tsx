import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  CircularProgress,
  InputAdornment,
  Chip,
  Stack
} from '@mui/material'
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon
} from '@mui/icons-material'
import MemberForm from '../components/forms/MemberForm'
import { apiService } from '../services/api'
import { Member, MemberFormData, MemberFilters } from '../types'
import { exportFilteredMembersToExcel } from '../utils/excel'

export default function Members() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState('')

  useEffect(() => {
    loadMembers()
  }, [searchQuery, genderFilter])

  const loadMembers = async () => {
    setLoading(true)
    try {
      const filters: MemberFilters = {}
      if (searchQuery) filters.search = searchQuery
      if (genderFilter) filters.gender = genderFilter
      
      const response = await apiService.getMembers(filters)
      if (response.success && response.data) {
        setMembers(response.data)
      } else {
        console.error('Failed to load members:', response.error)
        // For development, show mock data if API fails
        setMembers([])
      }
    } catch (error) {
      console.error('Error loading members:', error)
      setMembers([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = async (data: MemberFormData) => {
    try {
      const response = await apiService.createMember(data)
      if (response.success) {
        await loadMembers() // Reload the list
        setShowAddForm(false)
        alert('Member added successfully!')
      } else {
        alert('Error adding member: ' + response.error)
      }
    } catch (error) {
      console.error('Error adding member:', error)
      alert('Error adding member. Please try again.')
    }
  }

  const handleEditMember = async (data: MemberFormData) => {
    if (!editingMember) return
    
    try {
      const response = await apiService.updateMember(editingMember.id, data)
      if (response.success) {
        await loadMembers() // Reload the list
        setEditingMember(null)
        alert('Member updated successfully!')
      } else {
        alert('Error updating member: ' + response.error)
      }
    } catch (error) {
      console.error('Error updating member:', error)
      alert('Error updating member. Please try again.')
    }
  }

  const handleDeleteMember = async (id: number) => {
    if (!confirm('Are you sure you want to delete this member?')) return
    
    try {
      const response = await apiService.deleteMember(id)
      if (response.success) {
        await loadMembers() // Reload the list
        alert('Member deleted successfully!')
      } else {
        alert('Error deleting member: ' + response.error)
      }
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Error deleting member. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const handleExportToExcel = async () => {
    try {
      const filters = { 
        search: searchQuery || undefined, 
        gender: genderFilter || undefined 
      }
      
      const success = await exportFilteredMembersToExcel(members, filters)
      if (success) {
        alert('Members exported to Excel successfully!')
      } else {
        alert('Failed to export members to Excel.')
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('An error occurred while exporting members.')
    }
  }

  return (
    <Box >
      <Box sx={{ p: { xs: 2, sm: 3, lg: 4 } }}>
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Members
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your gym members ({members.length} total)
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Button 
              onClick={handleExportToExcel}
              variant="outlined"
              startIcon={<DownloadIcon />}
              disabled={members.length === 0}
            >
              Export to Excel
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Member
            </Button>
          </Stack>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              placeholder="Search members by name..."
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
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Gender Filter</InputLabel>
              <Select
                value={genderFilter}
                label="Gender Filter"
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <MenuItem value="">All Genders</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Members List */}
        <Paper>
          {loading ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Loading members...
              </Typography>
            </Box>
          ) : members.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                No members found
              </Typography>
              <Button 
                onClick={() => setShowAddForm(true)}
                variant="contained"
              >
                Add Your First Member
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Member</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Profession</TableCell>
                    <TableCell>Joined</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id} hover>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {member.firstName} {member.middleName} {member.lastName}
                          </Typography>
                          <Chip 
                            label={member.gender} 
                            size="small" 
                            color="primary"
                            sx={{ textTransform: 'capitalize', mt: 0.5 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{member.email}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {member.whatsappNo}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {calculateAge(member.dateOfBirth.toString())} years
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{member.profession}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(member.createdAt.toString())}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            onClick={() => setEditingMember(member)}
                            size="small"
                            color="primary"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteMember(member.id)}
                            size="small"
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Add Member Form */}
        <MemberForm
          isOpen={showAddForm}
          onClose={() => setShowAddForm(false)}
          onSubmit={handleAddMember}
        />

        {/* Edit Member Form */}
        {editingMember && (
          <MemberForm
            isOpen={true}
            onClose={() => setEditingMember(null)}
            onSubmit={handleEditMember}
            initialData={{
              firstName: editingMember.firstName,
              middleName: editingMember.middleName,
              lastName: editingMember.lastName,
              gender: editingMember.gender,
              address: editingMember.address,
              whatsappNo: editingMember.whatsappNo,
              email: editingMember.email,
              dateOfBirth: editingMember.dateOfBirth.toString().split('T')[0],
              profession: editingMember.profession,
              reference: editingMember.reference,
              aadharCard: editingMember.aadharCard,
              photoUrl: editingMember.photoUrl,
            }}
            isEditing={true}
          />
        )}
      </Box>
    </Box>
  )
}