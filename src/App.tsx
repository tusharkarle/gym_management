import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { Button, Stack } from '@mui/material'
import { Add as AddIcon, Download as DownloadIcon } from '@mui/icons-material'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from './theme/muiTheme'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Sidebar from './components/Sidebar'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Members from './pages/Members'
import Packages from './pages/Packages'
import Attendance from './pages/Attendance'
import Billing from './pages/Billing'
import Reports from './pages/Reports'
import Settings from './pages/Settings'

function App() {
  // TODO: Initialize NestJS backend when running in Electron
  // For now, we'll develop the frontend with mock data

  const membersActions = (
    <Stack direction="row" spacing={1.5}>
      <Button 
        variant="outlined"
        startIcon={<DownloadIcon />}
        size="small"
        onClick={() => {
          const exportBtn = document.getElementById('members-export-btn');
          if (exportBtn) exportBtn.click();
        }}
      >
        Export to Excel
      </Button>
      <Button 
        variant="outlined"
        startIcon={<AddIcon />}
        size="small"
        onClick={() => {
          const newBtn = document.getElementById('members-new-btn');
          if (newBtn) newBtn.click();
        }}
      >
        New Member
      </Button>
    </Stack>
  );

  const packagesActions = (
    <Stack direction="row" spacing={1.5}>
      <Button 
        variant="outlined"
        startIcon={<AddIcon />}
        size="small"
        onClick={() => {
          const newBtn = document.getElementById('packages-new-btn');
          if (newBtn) newBtn.click();
        }}
      >
        New Package
      </Button>
    </Stack>
  );

  const renewalActions = (
    <Stack direction="row" spacing={1.5}>
      <Button 
        variant="outlined"
        startIcon={<DownloadIcon />}
        size="small"
        onClick={() => {
          const exportBtn = document.getElementById('billing-export-btn');
          if (exportBtn) exportBtn.click();
        }}
      >
        Export
      </Button>
      <Button 
        variant="outlined"
        startIcon={<AddIcon />}
        size="small"
        onClick={() => {
          const newBtn = document.getElementById('billing-new-btn');
          if (newBtn) newBtn.click();
        }}
      >
        Process Renewal
      </Button>
    </Stack>
  );

  const reportsActions = (
    <Stack direction="row" spacing={1.5}>
      <Button 
        variant="outlined"
        startIcon={<DownloadIcon />}
        size="small"
        onClick={() => {
          const exportBtn = document.getElementById('reports-export-btn');
          if (exportBtn) exportBtn.click();
        }}
      >
        Export Report
      </Button>
    </Stack>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <ProtectedRoute>
            <div className="flex h-screen bg-gray-50">
              <Sidebar />
              <main className="flex-1 overflow-hidden">
                <Routes>
                  <Route path="/" element={
                    <MainLayout title="Dashboard" subtitle="Welcome to your gym management system">
                      <Dashboard />
                    </MainLayout>
                  } />
                  <Route path="/members" element={
                    <MainLayout title="Members" subtitle="Manage your gym members and their information" actions={membersActions}>
                      <Members />
                    </MainLayout>
                  } />
                  <Route path="/packages" element={
                    <MainLayout title="Packages" subtitle="Manage membership packages and pricing" actions={packagesActions}>
                      <Packages />
                    </MainLayout>
                  } />
                  <Route path="/attendance" element={
                    <MainLayout title="Attendance" subtitle="Track member check-ins and attendance">
                      <Attendance />
                    </MainLayout>
                  } />
                  <Route path="/billing" element={
                    <MainLayout title="Renewal" subtitle="Manage membership renewals and payments" actions={renewalActions}>
                      <Billing />
                    </MainLayout>
                  } />
                  <Route path="/reports" element={
                    <MainLayout title="Reports" subtitle="View analytics and business insights" actions={reportsActions}>
                      <Reports />
                    </MainLayout>
                  } />
                  <Route path="/settings" element={
                    <MainLayout title="Settings" subtitle="Configure system preferences">
                      <Settings />
                    </MainLayout>
                  } />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
