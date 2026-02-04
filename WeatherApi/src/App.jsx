import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
const App = () => {
  const [place, setPlace] = useState('')
  const [info, setInfo] = useState({})
  const [msg, setMsg] = useState('')

  function getinfo() {
    if (place === '') {
      setMsg('Please enter place name')
      return
    }

    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=dd900c14315943da9af153534260302&q=${place}&aqi=no`
      )
      .then((res) => {
        setInfo(res.data)
        setPlace('')
        setMsg('')
      })
      .catch(() => {
        setMsg('Check place name')
        setInfo({})
      })
  }

  return (
    <div className='maincontainer'>
      <h1>Weather API</h1>
      <h3 style={{color:'orange', fontFamily:'-apple-system'}}>{msg}</h3>

      <input type="search" placeholder="Enter place name" value={place} onChange={(e)=>setPlace(e.target.value)}
      />
      <button onClick={getinfo}>Get Info</button>

      {info?.location && (
        <div className='card'>
          <h2>Place: {info.location.name}</h2>
          <p>Region: {info.location.region}</p>
          <p>Country: {info.location.country}</p>

          <p>Updated: {info.current.last_updated}</p>
          <p>Temperature: {info.current.temp_c} °C</p>
          <p>
            Time: {info.current.is_day === 1 ? 'Day ☀️' : 'Night 🌙'}
          </p>
        </div>
      )}
    </div>
  )
}

export default App
