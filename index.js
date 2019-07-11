const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');
var cors = require('cors');

const app = express();

// var whitelist = ['http://localhost:3000', 'http://localhost:5000'];

// var corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(cors());
// Connect to database
// connectDB();

app.use(express.json({ extented: false }));

// Define Routes
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
