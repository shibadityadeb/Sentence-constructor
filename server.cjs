// Simple server to serve the data locally
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// Read the data from db.json
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));

app.get('/data', (req, res) => {
  res.json(data);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
