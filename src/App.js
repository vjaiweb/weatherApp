import React, { useState } from 'react';
import Weather from './Weather';

const App = () => {
  const [weatherData, setWData] = useState(null);

  return (
    <div className="App">
      <Weather apiKey="YOUR_API_KEY" weatherData={weatherData} setWData={setWData} />
    </div>
  );
};

export default App;

