const jwt = require('jsonwebtoken');

/**
 * Login controller - validates credentials against environment variables
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    // Get credentials from environment variables
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

    // Validate environment variables are set
    if (!adminUsername || !adminPassword) {
      console.error('ADMIN_USERNAME or ADMIN_PASSWORD not set in environment variables');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // Validate credentials
    if (username !== adminUsername || password !== adminPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        username: adminUsername,
        role: 'admin'
      },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Send success response with token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = { login };
