
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [deviceInfo, setDeviceInfo] = useState({});
//   const [batteryStatus, setBatteryStatus] = useState({});
//   const [internetSpeed, setInternetSpeed] = useState({});

//   function giveTest() {
//     axios.get('http://localhost:5000/api/device').then(response => setDeviceInfo(response.data));
//     axios.get('http://localhost:5000/api/internet-speed').then(response => setInternetSpeed(response.data));
    
//     navigator.getBattery().then(battery => {
//       setBatteryStatus({
//         level: battery.level * 100 + '%',
//         charging: battery.charging
//       });
//     });
//   }

//   useEffect(() => {
//    giveTest()
//   }, []);

//   return (
//     <div>
//       <h1>Device Info</h1>
//       <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>

//       <h1>Battery Status</h1>
//       <pre>{JSON.stringify(batteryStatus, null, 2)}</pre>

//       <h1>Internet Speed</h1>
//       <pre>{JSON.stringify(internetSpeed, null, 2)}</pre>
//     </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [deviceInfo, setDeviceInfo] = useState();
  const [batteryStatus, setBatteryStatus] = useState();
  const [internetSpeed, setInternetSpeed] = useState();

  function giveTest() {
    axios.get('http://localhost:5000/api/device')
    .then(response => setDeviceInfo(response.data))
    .catch(error => {
      console.error('Error fetching device info:', error);
      // You can also set some user-friendly message in state and show it in UI
    });
  
  axios.get('http://localhost:5000/api/internet-speed')
    .then(response => setInternetSpeed(response.data))
    .catch(error => {
      console.error('Error fetching internet speed:', error);
      // You can also set some user-friendly message in state and show it in UI
    });
    
    navigator.getBattery().then(battery => {
      setBatteryStatus({
        level: battery.level * 100 + '%',
        charging: battery.charging
      });
    });
  }

  return (
    <div style={{margin:"auto", width: "50%"}}>
      <h1>Device Info</h1>
      <button onClick={giveTest}>Get Device Information</button>
      <pre>{JSON.stringify(deviceInfo, null, 2)}</pre>

      <h1>Battery Status</h1>
      <pre>{JSON.stringify(batteryStatus, null, 2)}</pre>

      <h1>Internet Speed</h1>
      <pre>{JSON.stringify(internetSpeed, null, 2)}</pre>
    </div>
  );
}

export default App;
