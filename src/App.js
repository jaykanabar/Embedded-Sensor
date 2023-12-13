// App.js
import React from 'react';
import GraphComponent from './Components.jsx/GraphComponent';
import GraphFFTComponent from './Components.jsx/GraphFFT';

function App() {
  return (
    <div>
      <h1>Real-time Graph from Firebase Data</h1>
      <GraphComponent />
      <h1>FFT Converted Graph</h1>
      <GraphFFTComponent/>
    </div>
  );
}

export default App;
