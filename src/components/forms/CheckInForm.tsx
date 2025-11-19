import { useState } from 'react'
import {
  Card,
  CardContent,
  TextField,
  Typography,
  Paper,
  Box,
  Button,
  Stack
} from '@mui/material'
import { Search as SearchIcon, Check as CheckIcon } from '@mui/icons-material'

interface Member {
  id: number
  firstName: string
  middleName?: string
  lastName: string
  email: string
  whatsappNo: string
}

interface CheckInFormProps {
  onCheckIn: (memberId: number) => Promise<void>
}

export default function CheckInForm({ onCheckIn }: CheckInFormProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchResults, setSearchResults] = useState<Member[]>([])
  const [showResults, setShowResults] = useState(false)

  // Mock member data for demonstration
  const mockMembers: Member[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@gmail.com', whatsappNo: '9876543210' },
    { id: 2, firstName: 'Jane', middleName: 'Marie', lastName: 'Smith', email: 'jane@gmail.com', whatsappNo: '9876543211' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike@gmail.com', whatsappNo: '9876543212' },
    { id: 4, firstName: 'Sarah', lastName: 'Wilson', email: 'sarah@gmail.com', whatsappNo: '9876543213' },
    { id: 5, firstName: 'David', lastName: 'Brown', email: 'david@gmail.com', whatsappNo: '9876543214' },
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    
    if (query.trim() === '') {
      setSearchResults([])
      setShowResults(false)
      return
    }

    // Search by name, phone, or member ID
    const filtered = mockMembers.filter(member => {
      const fullName = `${member.firstName} ${member.middleName || ''} ${member.lastName}`.toLowerCase()
      const queryLower = query.toLowerCase()
      
      return (
        fullName.includes(queryLower) ||
        member.whatsappNo.includes(query) ||
        member.id.toString() === query ||
        member.email.toLowerCase().includes(queryLower)
      )
    })

    setSearchResults(filtered)
    setShowResults(true)
  }

  const handleMemberSelect = (member: Member) => {
    setSelectedMember(member)
    setSearchQuery(`${member.firstName} ${member.middleName || ''} ${member.lastName}`.trim())
    setShowResults(false)
  }

  const handleCheckIn = async () => {
    if (!selectedMember) return

    setIsSubmitting(true)
    try {
      await onCheckIn(selectedMember.id)
      
      // Reset form after successful check-in
      setSelectedMember(null)
      setSearchQuery('')
      setShowResults(false)
    } catch (error) {
      console.error('Check-in failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMemberFullName = (member: Member) => {
    return `${member.firstName} ${member.middleName || ''} ${member.lastName}`.trim()
  }

  return (
    <Card sx={{ height: 'fit-content' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckIcon />
          Quick Check-In
        </Typography>
        
        <Box sx={{ mt: 2 }}>
        {/* Member Search */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search member by name, phone, or ID..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              ),
            }}
            size="small"
            sx={{ mb: 1 }}
          />

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <Paper
              sx={{
                position: 'absolute',
                zIndex: 10,
                width: '100%',
                mt: 0.5,
                maxHeight: 240,
                overflow: 'auto',
                border: 1,
                borderColor: 'divider'
              }}
            >
              {searchResults.map((member) => (
                <Box
                  key={member.id}
                  onClick={() => handleMemberSelect(member)}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                    borderBottom: 1,
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 0 }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {getMemberFullName(member)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {member.id}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" color="text.secondary">
                        {member.whatsappNo}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        {member.email}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Paper>
          )}

          {showResults && searchResults.length === 0 && searchQuery.trim() !== '' && (
            <Paper
              sx={{
                position: 'absolute',
                zIndex: 10,
                width: '100%',
                mt: 0.5,
                p: 2,
                textAlign: 'center',
                border: 1,
                borderColor: 'divider'
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No members found matching "{searchQuery}"
              </Typography>
            </Paper>
          )}
        </Box>

        {/* Selected Member Display */}
        {selectedMember && (
          <Paper sx={{ bgcolor: 'primary.light', p: 2, mb: 3, border: 1, borderColor: 'primary.main' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box>
                <Typography variant="body1" fontWeight="medium" color="primary.dark">
                  {getMemberFullName(selectedMember)}
                </Typography>
                <Typography variant="caption" color="primary.dark">
                  ID: {selectedMember.id} | Phone: {selectedMember.whatsappNo}
                </Typography>
              </Box>
              <CheckIcon sx={{ color: 'primary.main' }} />
            </Stack>
          </Paper>
        )}


        {/* Check-in Button */}
        <Button
          onClick={handleCheckIn}
          disabled={!selectedMember || isSubmitting}
          variant="contained"
          color="success"
          size="large"
          fullWidth
          sx={{ py: 1.5, fontWeight: 600 }}
        >
          {isSubmitting ? 'Recording Check-in...' : 'Record Check-in'}
        </Button>

        {!selectedMember && (
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Search and select a member to record their check-in
          </Typography>
        )}
        </Box>
      </CardContent>
    </Card>
  )
}