import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // For dark mode check
import { motion } from 'framer-motion'; // For smooth animations
import MoodIcon from '@mui/icons-material/Mood'; // Example icon for fun, relevant to the app

function Home() {
  // Accessing the dark mode state from Redux
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // Set background gradient dynamically based on darkMode
        background: darkMode
          ? 'linear-gradient(135deg, #212121, #333)' // Dark mode background gradient
          : 'linear-gradient(135deg, #ffffff, #F5F5F5)', // Light mode background gradient
        padding: 3,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper
            sx={{
              textAlign: 'center',
              padding: 5,
              borderRadius: 4,
              boxShadow: 8,
              backgroundColor: darkMode ? '#424242' : 'white', // Paper background for light/dark mode
              transform: 'scale(1)',
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
            elevation={10}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: darkMode ? '#EAEAEA' : '#333333', // Title color based on dark mode
                  fontWeight: 'bold',
                  fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.2rem' },
                  marginBottom: 3,
                  letterSpacing: 1,
                }}
              >
                Welcome to Mood Tracker
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: darkMode ? '#B0BEC5' : '#666666', // Subtitle color based on dark mode
                  marginBottom: 4,
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' },
                  fontWeight: 'light',
                  lineHeight: 1.5,
                }}
              >
                Track your daily moods, set reminders, and improve your well-being. Your emotional journey starts here!
              </Typography>

              <Box sx={{ marginBottom: 4 }}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <MoodIcon sx={{ fontSize: 70, color:'red' }} />
                </motion.div>
              </Box>

              <Button
                component={Link}
                to="/track-mood"
                variant="contained"
                sx={{
                  background: darkMode
                    ? 'linear-gradient(45deg,rgb(72, 185, 255),rgb(18, 85, 243))' // Dark mode button gradient
                    : 'linear-gradient(45deg,rgb(29, 164, 209),rgb(18, 100, 243))', // Light mode button gradient
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '14px 35px',
                  borderRadius: '30px',
                  boxShadow: 6,
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  '&:hover': {
                    background: darkMode
                      ? 'linear-gradient(45deg,rgb(29, 164, 209),rgb(18, 100, 243))' // Dark mode hover gradient
                      : 'linear-gradient(45deg,rgb(72, 185, 255),rgb(18, 85, 243))', // Light mode hover gradient
                    boxShadow: 12,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                Start Tracking
              </Button>
            </motion.div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
