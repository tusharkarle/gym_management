import { Box } from '@mui/material';
import MainHeader from './MainHeader';

interface MainLayoutProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function MainLayout({ title, subtitle, actions, children }: MainLayoutProps) {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MainHeader title={title} subtitle={subtitle} actions={actions} />
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflow: 'auto',
          bgcolor: 'background.default'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}