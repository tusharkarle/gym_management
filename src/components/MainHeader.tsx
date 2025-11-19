import { Box, Typography, Stack } from '@mui/material';

interface MainHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function MainHeader({ title, subtitle, actions }: MainHeaderProps) {
  return (
    <>
      <Box
        sx={{
          py: 2.5,
          px: 3,
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={subtitle ? 'flex-start' : 'center'}
          spacing={2}
        >
          <Box>
            <Typography 
              variant="h4" 
              component="h1" 
              fontWeight="bold"
              color="primary.main"
              gutterBottom={!!subtitle}
              sx={{ mb: subtitle ? 0.5 : 0 }}
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.25 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          {actions && (
            <Box sx={{ flexShrink: 0 }}>
              {actions}
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
}