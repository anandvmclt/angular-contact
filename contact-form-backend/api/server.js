const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  createContact,
  getAllContacts,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("./controllers/contactController.js");
const { signup, login, refreshToken } = require("./controllers/userController.js");
const authMiddleware = require("./middleware/jwt.js");

const app = express();

// Replace with your MongoDB connection string
const mongoURI = "mongodb+srv://vasscms:vasscms@cms.gvkzbzk.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    // Start server only after successful MongoDB connection
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server started. Visit : http://localhost:${PORT}/`)
    );
  })
  .catch((err) => console.error(err));

// Allow CORS (adjust origins if needed)
app.use(cors({ origin: "http://localhost:4200" }));

// Parse incoming form data
app.use(bodyParser.json());

// API Endpoint to receive contact form data (unchanged)
app.post("/api/contact",authMiddleware, createContact);
// Get All Contacts (Read All)
app.get("/api/contacts",authMiddleware,  getAllContacts);

// Get Single Contact by ID (Read One)
app.get("/api/contacts/:id",authMiddleware,  getContactById);

// Update Contact by ID (Update)
app.put("/api/contact/:id",authMiddleware,  updateContactById);

// Delete Contact by ID (Delete)
app.delete("/api/contact/:id",authMiddleware,  deleteContactById);

// users signup
app.post("/api/signup", signup);

// users login
app.post("/api/login", login);

// refresh token
app.post("/api/refresh-token", refreshToken);