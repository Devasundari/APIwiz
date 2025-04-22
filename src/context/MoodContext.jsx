import React, { createContext, useContext, useState } from 'react';

const MoodContext = createContext();

export function useMood() {
  return useContext(MoodContext);
}

export const MoodProvider = ({ children }) => {
  const [moods, setMoods] = useState([]);

  const addMood = (mood) => {
    setMoods((prevMoods) => [...prevMoods, mood]);
  };

  const deleteMood = (index) => {
    setMoods((prevMoods) => prevMoods.filter((_, i) => i !== index));
  };

  return (
    <MoodContext.Provider value={{ moods, addMood, deleteMood }}>
      {children}
    </MoodContext.Provider>
  );
};
