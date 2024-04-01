const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Contact  = require("./schemas/contact.js");
const User  = require("./schemas/user.js");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

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
app.post("/api/contact", async (req, res) => {
  const { name, email, mobile, message } = req.body;

  // Simple validation (can be extended)
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }

  try {
    const newContact = new Contact({ name, email, mobile, message });
    await newContact.save();
    res.json({ message: "Contact form submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get All Contacts (Read All)
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get Single Contact by ID (Read One)
app.get("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Contact by ID (Update)
app.put("/api/contact/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, mobile, message, isRead } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  const update = { name, email, mobile, message, isRead };

  try {
    const contact = await Contact.findByIdAndUpdate(id, update, { new: true });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Contact by ID (Delete)
app.delete("/api/contact/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid contact ID" });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// users

app.post("/api/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }
  try {
    let existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ userName, email, password:hashedPassword });
    console.log(newUser);
    await newUser.save();
    const payload = {
      user: {
        id: newUser.id,
      },
    };
   const token= jwt.sign(payload,'process.env.JWT_SECRET',{ expiresIn: '1h' });
    res.json({ message: "user form submitted successfully!" ,token,success:true});
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, 'process.env.JWT_SECRET', { expiresIn: '1h' });

    res.json({ message: "Login successful", token ,success:true});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});
