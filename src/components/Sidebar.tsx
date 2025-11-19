import { NavLink, useLocation } from 'react-router-dom'
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
  Stack
} from '@mui/material'
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as PackageIcon,
  Today as AttendanceIcon,
  BarChart as ReportsIcon,
  CurrencyRupee as BillingIcon,
  Settings as SettingsIcon
} from '@mui/icons-material'

const navigation = [
  { name: 'Dashboard', href: '/', icon: DashboardIcon },
  { name: 'Members', href: '/members', icon: PeopleIcon },
  { name: 'Packages', href: '/packages', icon: PackageIcon },
  { name: 'Attendance', href: '/attendance', icon: AttendanceIcon },
  { name: 'Billing', href: '/billing', icon: BillingIcon },
  { name: 'Reports', href: '/reports', icon: ReportsIcon },
  { name: 'Settings', href: '/settings', icon: SettingsIcon },
]

export default function Sidebar() {
  const location = useLocation()

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
        <Box sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
              <Typography variant="h6" fontWeight="bold">
                G
              </Typography>
            </Avatar>
            <Typography variant="h6" fontWeight="semibold">
              Gym Manager
            </Typography>
          </Stack>
        </Box>

        {/* Navigation */}
        <Box sx={{ flexGrow: 1, px: 2 }}>
          <List disablePadding>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
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
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name}
                      primaryTypographyProps={{
                        fontWeight: 500
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>

        {/* User Section */}
        <Box sx={{ mt: 'auto' }}>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }} />
              <Box>
                <Typography variant="body2" fontWeight="medium">
                  Admin User
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  admin@gym.com
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Drawer>
  )
}