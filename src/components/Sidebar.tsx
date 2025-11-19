import { NavLink, useLocation } from 'react-router-dom'
import { env } from '../config/env'
import { useAuth } from '../contexts/AuthContext'
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Divider,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Today as AttendanceIcon,
  BarChart as ReportsIcon,
  CurrencyRupee as BillingIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material'

const navigation = [
  { name: 'Dashboard', href: '/', icon: DashboardIcon },
  { name: 'Members', href: '/members', icon: PeopleIcon },
  { name: 'Attendance', href: '/attendance', icon: AttendanceIcon },
  { name: 'Renewal', href: '/billing', icon: BillingIcon },
  { name: 'Reports', href: '/reports', icon: ReportsIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: 256,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 256,
          boxSizing: 'border-box',
          borderRight: 1,
          borderColor: 'divider'
        },
      }}
    >
      <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Logo Section */}
        <Box sx={{ p: 2.5 }}> {/* Reduced padding */}
          <Stack direction="row" alignItems="center" spacing={1.5}> {/* Reduced spacing */}
            <Avatar sx={{ bgcolor: 'primary.main', width: 28, height: 28 }}> {/* Reduced size */}
              <Typography variant="body1" fontWeight="bold">
                🏋️
              </Typography>
            </Avatar>
            <Typography variant="subtitle1" fontWeight="semibold"> {/* Reduced from h6 to subtitle1 */}
              {env.gymName}
            </Typography>
          </Stack>
        </Box>

        <Divider />

        {/* Navigation */}
        <Box sx={{ flexGrow: 1, px: 1.5, py: 1.5 }}> {/* Reduced padding */}
          <List disablePadding>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <ListItem key={item.name} disablePadding sx={{ mb: 0.25 }}> {/* Reduced margin */}
                  <ListItemButton
                    component={NavLink}
                    to={item.href}
                    selected={isActive}
                    sx={{
                      borderRadius: 1,
                      '&.Mui-selected': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        },
                        '& .MuiListItemIcon-root': {
                          color: 'white',
                        },
                        '& .MuiListItemText-primary': {
                          color: 'white',
                          fontWeight: 600,
                        },
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}> {/* Reduced min width */}
                      <Icon sx={{ fontSize: '1.1rem' }} /> {/* Smaller icons */}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        variant: 'body2' // Smaller text
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>

        {/* Logout Section */}
        <Box sx={{ mt: 'auto' }}>
          <Divider />
          <Box sx={{ p: 1.5 }}> {/* Reduced padding */}
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'error.50',
                  '& .MuiListItemIcon-root': {
                    color: 'error.main',
                  },
                  '& .MuiListItemText-primary': {
                    color: 'error.main',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}> {/* Reduced min width */}
                <LogoutIcon sx={{ fontSize: '1.1rem' }} /> {/* Smaller icon */}
              </ListItemIcon>
              <ListItemText 
                primary="Logout"
                primaryTypographyProps={{
                  fontWeight: 500,
                  variant: 'body2' // Smaller text
                }}
              />
            </ListItemButton>
          </Box>
        </Box>

      </Box>
    </Drawer>
  )
}