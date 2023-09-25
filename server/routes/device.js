// /server/routes/device.js
const express = require('express');
const router = express.Router();
const si = require('systeminformation');
const { exec } = require('child_process');


router.get('/device', async (req, res) => {
    try {
      const system = await si.system();
      const cpu = await si.cpu();
      const ram = await si.mem();
      const osInfo = await si.osInfo();
      const disk = await si.fsSize();
      const batteryData = await si.battery();
  
      const deviceInfo = {
        system,
        cpu,
        ram,
        batteryData,
        osInfo,
        disk,
      };
  
      res.json(deviceInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

router.get('/internet-speed', (req, res) => {
  exec('speedtest -f json', (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(error.toString());
      return;
    }
    if (stderr) {
      res.status(500).send(stderr);
      return;
    }
    res.send(stdout);
  });
});

module.exports = router;
