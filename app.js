const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Use body-parser middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Replace '<username>', '<password>', 'your_cluster_name', and 'your_database_name' with your MongoDB Atlas credentials
const connectionString = 'mongodb+srv://parampathak47:param.22.07.2004@winterwizgwoc24.uyd9u.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB using the connection string
mongoose.connect(connectionString);

// Define a mongoose schema for the form data
const cafeSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Cafe = mongoose.model('Cafe', cafeSchema);

// Set up a route for handling form submissions
app.post('/submit-form', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email } = req.body;

    // Create a new Cafe instance and save it to the database
    const newCafe = new Cafe({ name, email });
    await newCafe.save();

    // Send a success response
    res.json({ success: true, message: 'Form submitted successfully!' });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
