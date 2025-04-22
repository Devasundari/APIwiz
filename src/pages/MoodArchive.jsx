import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const MoodArchive = () => {
  const moods = useSelector((state) => state.moods.entries);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>Mood Archive</Typography>
      <Grid container spacing={2}>
        {moods.map((entry, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6">{entry.date}</Typography>
                <Typography>Mood: {entry.mood}</Typography>
                <Typography>Note: {entry.note}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MoodArchive;
