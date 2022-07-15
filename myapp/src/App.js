import React, { useEffect, useState } from 'react';
import Clear from './assets/clear.jpg';
import Cloudy from './assets/cloudy.jpg';
import Rainy from './assets/rainy.jpg';
import Overcast from './assets/overcast.jpg';
import Snow from './assets/snow.jpg';
import './App.css';

function App() {
  const [place, setPlace] = useState("new york");
  const [placeInfo, setPlaceInfo] = useState({});

  const handleFetch = async() => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=383e96fd519d4565acc161015220507&q=${place}&aqi=no`)
    const data = await response.json();
    console.log(data);
    setPlaceInfo({
      name: data.location.name,
      country: data.location.country,
      temperature: data.current.temp_f,
      condition: data.current.condition.text,
    });
    setPlace("");
  };
 
useEffect(() =>{

  handleFetch();

}, [])
  return (
    <div 
     className="app"
     style={
       placeInfo.condition?.toLowerCase() === "clear" ||
       placeInfo.condition?.toLowerCase() === "sunny"
       ? {backgroundImage: `url(${Clear})`} 
       : placeInfo.condition?.toString().includes("cloudy")
       ? {backgroundImage: `url(${Cloudy})`} 
       : placeInfo.condition?.toString().includes("rainy")
       ? {backgroundImage: `url(${Rainy})`} 
       : placeInfo.condition?.toString().includes("snow")
       ? {backgroundImage: `url(${Snow})`}
       :  {backgroundImage: `url(${Overcast})`} 
      }>
      <div className='search-input'>
        <input 
           type='text'
           value={place}
           onChange={(e) => setPlace(e.target.value)}
        />
         <button onClick={handleFetch}>Search</button>
      </div>
      <div className='weatherInfo'>
         <h1  className='temp'>{placeInfo.temperature}
           <span className='temp-span'> ْF</span>
         </h1>
         <h4>{placeInfo.condition}</h4>
         <h2  className='name'>{placeInfo.name}</h2>
         <h2  className='country'>{placeInfo.country}</h2>
        
         
         
        
      </div>
     
    </div>
  );
}

export default App;
