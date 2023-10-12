import React, { useState } from 'react';
import axios from 'axios';
import "./App.css";
import ScrollToTopButton from './components/ScrollToTopButton';


function App() {
  const [deviceInfo, setDeviceInfo] = useState();
  const [batteryStatus, setBatteryStatus] = useState();
  const [internetSpeed, setInternetSpeed] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [batteryReport, setBatteryReport] = useState('');
 

  function giveTest() {
    setIsLoading(true);
    axios.get('http://localhost:5000/api/device')
      .then(response => setDeviceInfo(response.data))
      .catch(error => console.error('Error fetching device info:', error))
      .finally(() => setIsLoading(false));

    axios.get('http://localhost:5000/api/internet-speed')
      .then(response => setInternetSpeed(response.data))
      .catch(error => console.error('Error fetching internet speed:', error))
      .finally(() => setIsLoading(false));

    navigator.getBattery().then(battery => {
      setBatteryStatus({
        level: battery.level * 100 + '%',
        charging: battery.charging
      });
    });

    axios.get('http://localhost:5000/api/battery-report')
    .then((response) => {
      setBatteryReport(response.data);
    })
    .catch((error) => {
      console.error('Error fetching battery report:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className='App' style={{margin:"auto", width: "50%", marginTop:"40px", textAlign:'left'}}>
      
     <div className='btn'>
     <button onClick={giveTest}>Click Here To Get Device Information</button>
     </div>

      { isLoading && <div>Loading...</div> }
     
        <div>
     <h1 >Device Info</h1>
      <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>

      <h1>Internet Speed</h1>
      <pre>{JSON.stringify(internetSpeed, null, 2)}</pre>

      <h1>Battery Status</h1>
      <pre>{JSON.stringify(batteryStatus, null, 2)}</pre>

      { batteryReport && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: batteryReport }} />
        </div>
      )}

      <ScrollToTopButton />

     </div>
      
     
    </div>
  );
}

export default App;