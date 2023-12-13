// GraphComponent.js
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app'; // Import from the compat namespace
import 'firebase/compat/database'; // Import the database module
import Plot from 'react-plotly.js';

const GraphComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize Firebase with your project config
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

    // Set up the Firebase listener
    const handleData = snapshot => {
        const newData = snapshot.val();
        setData(prevData => {
          const newDataArray = newData ? Object.entries(newData) : [];
          // Combine the existing data with the new data
          const updatedData = [...prevData, ...newDataArray];
          return updatedData;
        });
      };
      

    dataRef.on('value', handleData);

    // Clean up the listener when the component is unmounted
    return () => dataRef.off('value', handleData);
  }, []);

  const plotData = {
    x: data.map(([key]) => key),
    y: data.map(([, value]) => value),
    type: 'line',
    mode: 'lines',
    name: 'Your Data',
  };

  const layout = {
    title: 'Firebase Data Plot',
    xaxis: { title: 'X Axis' },
    yaxis: { title: 'Y Axis' },
  };

  return (
    <Plot
      data={[plotData]}
      layout={layout}
    />
  );
};

export default GraphComponent;
