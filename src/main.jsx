import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
// import { MoodProvider } from './MoodContext'; // Import MoodProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <MoodProvider> */}
      <App />
    {/* </MoodProvider> */}
  </Provider>
);