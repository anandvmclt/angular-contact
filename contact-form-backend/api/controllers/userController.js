const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

exports.signup = async (req, res) => {
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
    const newUser = new User({ userName, email, password: hashedPassword });
    console.log(newUser);
    await newUser.save();
    const payload = {
      user: {
        id: newUser.id,
      },
    };
    const token = jwt.sign(payload, "process.env.JWT_SECRET", {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, 'process.env.JWT_SECRET', { expiresIn: '7d' });

    res.json({
      message: "user form submitted successfully!",
      token,
      refreshToken,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
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
      const refreshToken = jwt.sign(payload, 'process.env.JWT_SECRET', { expiresIn: '7d' });
      const token = jwt.sign(payload, 'process.env.JWT_SECRET', { expiresIn: '1h' });

      res.json({ message: "Login successful", token,refreshToken ,success:true});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server Error" });
    }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, 'process.env.JWT_SECRET');
    
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const accessToken = jwt.sign({ user: { id: user.id } }, 'process.env.JWT_SECRET', {
      expiresIn: '30m', 
    });

    const newRefreshToken = jwt.sign({ user: { id: user.id } }, 'process.env.JWT_SECRET', {
      expiresIn: '7d',
    });

    res.json({ accessToken, refreshToken: newRefreshToken,message: "Token refreshed successfully" ,success:true});
  } catch (err) {
    res.status(404).json({ message: 'Invalid refresh token' });
  }
};
