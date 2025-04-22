// src/components/Dashboard.jsx
import React, { useContext } from 'react';
import { useMood } from '../context/MoodContext';

const Dashboard = () => {
  const { moods } = useMood();

  return (
    <div>
      <h2>Saved Moods:</h2>
      {moods.length === 0 ? (
        <p>No moods saved yet.</p>
      ) : (
        <ul>
          {moods.map((mood, index) => (
            <li key={index}>
              <strong>{mood.mood}</strong> - {new Date(mood.date).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
