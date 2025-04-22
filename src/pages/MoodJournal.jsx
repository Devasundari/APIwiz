import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import { useMood } from "../context/MoodContext"; // Import MoodProvider

const moods = [
  {
    label: "Very Sad",
    icon: <SentimentVeryDissatisfiedIcon />,
    value: 1,
    color: "#ff6b6b",
  },
  {
    label: "Sad",
    icon: <SentimentDissatisfiedIcon />,
    value: 3,
    color: "#ff9f43",
  },
  {
    label: "Neutral",
    icon: <SentimentNeutralIcon />,
    value: 5,
    color: "#feca57",
  },
  {
    label: "Happy",
    icon: <SentimentSatisfiedAltIcon />,
    value: 7,
    color: "#1dd1a1",
  },
  {
    label: "Very Happy",
    icon: <SentimentVerySatisfiedIcon />,
    value: 9,
    color: "#54a0ff",
  },
];

const weatherIcons = {
  Sunny: <WbSunnyIcon sx={{ color: "#ffb400" }} />,
  Cloudy: <CloudIcon sx={{ color: "#90a4ae" }} />,
  Thunderstorm: <ThunderstormIcon sx={{ color: "#455a64" }} />,
};

function MoodJournal() {
  const { addMood, moods: savedMoods, deleteMood } = useMood(); // Add deleteMood from context
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [weather, setWeather] = useState(null);
  const theme = useTheme(); // Get the current theme

  const handleSave = () => {
    if (!selectedMood) return;
    const newEntry = {
      date: selectedDate.toDateString(),
      note,
      mood: selectedMood.value,
      emoji: selectedMood.icon, // Store the emoji here
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Smaller timestamp
    };
    addMood(newEntry); // Save mood to context
    setNote("");
    setSelectedMood(null);
  };

  const handleDelete = (index) => {
    deleteMood(index); // Call the deleteMood function from the context to delete the entry
  };

  useEffect(() => {
    const conditions = ["Sunny", "Rainy", "Cloudy", "Snowy", "Windy", "Foggy"];
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = import.meta.env.VITE_API_KEY;
  
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
  
          const data = await response.json();
  
          setWeather({
            temp: `${Math.round(data.main.temp)}°C`,
            condition: data.weather[0].main || conditions[Math.floor(Math.random() * conditions.length)],
          });
        } catch (error) {
          console.error("Weather API Error:", error);
  
          // fallback if API fails
          const fallbackWeather = {
            temp: `${Math.floor(Math.random() * 10 + 20)}°C`,
            condition: conditions[Math.floor(Math.random() * conditions.length)],
          };
          setWeather(fallbackWeather);
        }
      });
    }
  }, [selectedDate]);
  

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          background: selectedMood
            ? selectedMood.color
            : theme.palette.background.paper, // Use theme's background
          borderRadius: 4,
          p: 3,
          transition: "background 0.5s ease-in-out",
          color: theme.palette.text.primary, // Ensure the text color adapts to theme
        }}
      >
        <Typography variant="h4" gutterBottom>
          MoodMate
        </Typography>
        <Grid container spacing={4}>
          {/* Calendar and Weather */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateCalendar
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
            </LocalizationProvider>
            <Typography variant="h6" mt={2}>
              Weather on {selectedDate.toDateString()}:
            </Typography>
            <Typography>
              {weather
                ? `${weather.temp}, ${weather.condition} 
                  `
                : "Loading..."}
            </Typography>
          </Grid>

          {/* Mood + Note */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              How are you feeling today?
            </Typography>
            <Box display="flex" gap={1}>
              {moods.map((mood) => (
                <motion.div whileTap={{ scale: 1.2 }} key={mood.label}>
                  <IconButton
                    onClick={() => setSelectedMood(mood)}
                    sx={{
                      bgcolor:
                        selectedMood?.label === mood.label
                          ? "white"
                          : "transparent",
                      border:
                        selectedMood?.label === mood.label
                          ? "2px solid black"
                          : "none",
                    }}
                  >
                    {mood.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Add a note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSave}
              sx={{ mt: 2 }}
              disabled={!selectedMood}
            >
              Save
            </Button>
          </Grid>

          <Grid container spacing={6}>
            {/* Saved Moods */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 2,
                  borderRadius: 2,
                  border: "1px solid #ccc",
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <CardContent>
                  <Typography variant="h5" mb={2}>
                    Saved Moods
                  </Typography>
                  {savedMoods.length === 0 ? (
                    <Typography>No moods saved yet.</Typography>
                  ) : (
                    savedMoods.map((mood, index) => (
                      <Card
                        key={index}
                        variant="outlined"
                        sx={{
                          mb: 2,
                          boxShadow: 3,
                          position: "relative",
                          backgroundColor: theme.palette.background.default,
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              boxShadow: 3,
                            }}
                          >
                            {mood.emoji} {mood.note}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              fontSize: "0.75rem",
                              color: theme.palette.text.secondary,
                              marginTop: 1,
                              boxShadow: 3,
                            }}
                          >
                            {mood.timestamp} - {mood.date}
                          </Typography>
                          <IconButton
                            onClick={() => handleDelete(index)}
                            color="error"
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              backgroundColor:
                  
                                theme.palette.mode === "dark" ? "#333" : "#fff",
                              borderRadius: "50%",
                              "&:hover": {
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "#555"
                                    : "#ffdddd",
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Mood Chart */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <CardContent>
                  <Typography variant="h5" mb={2}>
                    Mood Chart for This Month
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={savedMoods}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#3f51b5"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default MoodJournal;
