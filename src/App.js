import React, { useState, useEffect, useCallback } from 'react';

import HorseList from './components/HorseList';
// import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [horseData, setHorseData] = useState([]);

  const fetchHorseDataHandler = useCallback(async () => {
  
    try {
      const response = await fetch('http://localhost:3016/horse');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedHorseData = [];

      for (const key in data) {
        loadedHorseData.push({
          id: data[key].id,
          name: data[key].name,
          favouriteFood: data[key].profile.favouriteFood,
          height: data[key].profile.physical.height,
          weight: data[key].profile.physical.weight
        });
      }

      setHorseData(loadedHorseData);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchHorseDataHandler();
  }, [fetchHorseDataHandler]);

  
  let content = <p>No data available .</p>;

  if (horseData.length > 0) {
    content = <HorseList horseData={horseData} />;
  }



  return (
    <React.Fragment>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
