import { createTheme } from '@mui/material/styles';

// Create a custom Material-UI theme for the gym management app
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b',
      light: '#94a3b8',
      dark: '#475569',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontSize: 13,
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    },
    h3: {
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      lineHeight: 1.6,
    },
    body2: {
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.025em',
    },
    caption: {
      lineHeight: 1.4,
    },
    overline: {
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.06)',
    '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
    '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 8px 10px rgba(0, 0, 0, 0.04)',
    '0px 25px 50px rgba(0, 0, 0, 0.12), 0px 12px 18px rgba(0, 0, 0, 0.06)',
    '0px 32px 64px rgba(0, 0, 0, 0.12), 0px 16px 24px rgba(0, 0, 0, 0.06)',
    '0px 40px 80px rgba(0, 0, 0, 0.12), 0px 20px 32px rgba(0, 0, 0, 0.06)',
    '0px 48px 96px rgba(0, 0, 0, 0.14), 0px 24px 40px rgba(0, 0, 0, 0.08)',
    '0px 56px 112px rgba(0, 0, 0, 0.16), 0px 28px 48px rgba(0, 0, 0, 0.10)',
    '0px 64px 128px rgba(0, 0, 0, 0.18), 0px 32px 56px rgba(0, 0, 0, 0.12)',
    '0px 72px 144px rgba(0, 0, 0, 0.20), 0px 36px 64px rgba(0, 0, 0, 0.14)',
    '0px 80px 160px rgba(0, 0, 0, 0.22), 0px 40px 72px rgba(0, 0, 0, 0.16)',
    '0px 88px 176px rgba(0, 0, 0, 0.24), 0px 44px 80px rgba(0, 0, 0, 0.18)',
    '0px 96px 192px rgba(0, 0, 0, 0.26), 0px 48px 88px rgba(0, 0, 0, 0.20)',
    '0px 104px 208px rgba(0, 0, 0, 0.28), 0px 52px 96px rgba(0, 0, 0, 0.22)',
    '0px 112px 224px rgba(0, 0, 0, 0.30), 0px 56px 104px rgba(0, 0, 0, 0.24)',
    '0px 120px 240px rgba(0, 0, 0, 0.32), 0px 60px 112px rgba(0, 0, 0, 0.26)',
    '0px 128px 256px rgba(0, 0, 0, 0.34), 0px 64px 120px rgba(0, 0, 0, 0.28)',
    '0px 136px 272px rgba(0, 0, 0, 0.36), 0px 68px 128px rgba(0, 0, 0, 0.30)',
    '0px 144px 288px rgba(0, 0, 0, 0.38), 0px 72px 136px rgba(0, 0, 0, 0.32)',
    '0px 152px 304px rgba(0, 0, 0, 0.40), 0px 76px 144px rgba(0, 0, 0, 0.34)',
    '0px 160px 320px rgba(0, 0, 0, 0.42), 0px 80px 152px rgba(0, 0, 0, 0.36)',
    '0px 168px 336px rgba(0, 0, 0, 0.44), 0px 84px 160px rgba(0, 0, 0, 0.38)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f5f9',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#cbd5e1',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: '#94a3b8',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '12px',
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          },
          '&:focus': {
            boxShadow: '0px 0px 0px 3px rgba(37, 99, 235, 0.2)',
          },
        },
        sizeLarge: {
          padding: '12px 32px',
        },
        sizeSmall: {
          padding: '6px 16px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e2e8f0',
          '&:hover': {
            boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
        },
        title: {
          fontWeight: 600,
          color: '#1e293b',
        },
        subheader: {
          color: '#64748b',
          marginTop: '4px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#ffffff',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#94a3b8',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '2px',
              borderColor: '#2563eb',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
          },
          '& .MuiFormHelperText-root': {
            marginTop: '6px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
        },
        elevation1: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05), 0px 2px 4px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          borderBottom: '1px solid #e2e8f0',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e2e8f0',
          backgroundColor: '#ffffff',
          borderRadius: '0',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
          '&.Mui-selected': {
            backgroundColor: '#dbeafe',
            color: '#2563eb',
            '&:hover': {
              backgroundColor: '#bfdbfe',
            },
            '& .MuiListItemIcon-root': {
              color: '#2563eb',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 500,
          height: '28px',
        },
        colorPrimary: {
          backgroundColor: '#dbeafe',
          color: '#1e40af',
        },
        colorSuccess: {
          backgroundColor: '#d1fae5',
          color: '#065f46',
        },
        colorWarning: {
          backgroundColor: '#fef3c7',
          color: '#92400e',
        },
        colorError: {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: '16px',
          '& .MuiDataGrid-cell': {
            padding: '16px',
            borderBottom: '1px solid #e2e8f0',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            borderRadius: '16px 16px 0 0',
          },
          '& .MuiDataGrid-columnHeader': {
            padding: '16px',
            fontWeight: 600,
            color: '#374151',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f8fafc',
          },
        },
      },
    },
  },
});

export default theme;