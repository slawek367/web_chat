import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/system';
import Box from '@mui/material/Box';

import theme from './theme';
import { AppBar } from 'components/AppBar';
import { Routes } from 'routes';
import { AppContext, useAppContext } from 'state';

export function App() {
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box>
            <AppBar />
            <Routes />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
