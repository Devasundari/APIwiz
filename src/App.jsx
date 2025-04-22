import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './redux/themeSlice';
import Home from './pages/Home';
import MoodJournal from './pages/MoodJournal';
import MoodArchive from './pages/MoodArchive';
import Analytics from './pages/Analytics';
import { MoodProvider } from './context/MoodContext';
import Dashboard from './components/Dashboard';


function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <MoodProvider>
    <ThemeProvider theme={theme}>
        
      <CssBaseline />
      <Router>
        <div style={{ textAlign: 'right', padding: '10px' }}>
          <IconButton onClick={() => dispatch(toggleTheme())}>
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
         
          <Route path="/track-mood" element={<MoodJournal />} />
          
          <Route path="/mood-archive" element={<MoodArchive />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
   </MoodProvider>
  );
}

export default App;