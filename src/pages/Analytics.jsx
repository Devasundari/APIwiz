import React from 'react';
import { Container, Typography, Paper } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const sampleMoodData = [
  { date: 'Apr 1', mood: 5 },
  { date: 'Apr 2', mood: 3 },
  { date: 'Apr 3', mood: 4 },
  { date: 'Apr 4', mood: 2 },
  { date: 'Apr 5', mood: 4 },
  { date: 'Apr 6', mood: 5 },
  { date: 'Apr 7', mood: 3 },
];

const Analytics = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Monthly Mood Analytics 📈
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sampleMoodData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[1, 5]} allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="mood" stroke="#3f51b5" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
};

export default Analytics;