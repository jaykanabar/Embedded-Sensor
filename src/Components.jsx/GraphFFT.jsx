// GraphComponent.jsx
import React, { useEffect, useState, useMemo } from 'react';
import firebase from 'firebase/compat/app'; // Import from the compat namespace
import 'firebase/compat/database'; // Import the database module
import Plot from 'react-plotly.js';
// import fft from 'fft-js';
import { fft } from 'mathjs';

const GraphFFTComponent = () => {
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    // ... Your Firebase setup and data listener code ...
    const firebaseConfig = {
        apiKey: "AIzaSyBbac-c2WdYhaViwxfnCtdYEAn7j0VK4gU",
        authDomain: "sensorembedded-dd8c1.firebaseapp.com",
        databaseURL: "https://sensorembedded-dd8c1-default-rtdb.firebaseio.com",
        projectId: "sensorembedded-dd8c1",
        storageBucket: "sensorembedded-dd8c1.appspot.com",
        messagingSenderId: "550824817735",
        appId: "1:550824817735:web:22d124e8cc402499a1ad62",
        measurementId: "G-5MJKR5B6FH"
      };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Reference to your Firebase Realtime Database
    const database = firebase.database();
    const dataRef = database.ref('/data');

    const handleData = snapshot => {
      const newData = snapshot.val();
      setRawData(prevData => {
        const newDataArray = newData ? Object.entries(newData) : [];
        const updatedData = [...prevData, ...newDataArray];
        return updatedData;
      });
    };

    dataRef.on('value', handleData);

    // Cleanup the data listener
    return () => dataRef.off('value', handleData);
  }, []);

  const fftData = useMemo(() => {
    if (rawData.length === 0) {
      return [];
    }

    // Perform FFT when raw data changes
    const complexData = fft(rawData.map(entry => entry[1]));
    const magnitudes = complexData.map(c => Math.sqrt(c.re ** 2 + c.im ** 2));

    return magnitudes;
  }, [rawData]);

  const plotRawData = {
    x: rawData.map(entry => entry[0]),
    y: rawData.map(entry => entry[1]),
    type: 'scatter',
    mode: 'lines',
    name: 'Raw Data',
  };

  const plotFftData = {
    x: fftData.map((_, index) => index),
    y: fftData,
    type: 'scatter',
    mode: 'lines',
    name: 'FFT Data',
  };

  const layout = {
    title: 'Raw Data and FFT Plot',
    xaxis: { title: 'X Axis' },
    yaxis: { title: 'Y Axis' },
  };

  return (
    <div>
     
      <Plot
        data={[plotFftData]}
        layout={layout}
      />
    </div>
  );
};

export default GraphFFTComponent;

