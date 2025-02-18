import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Add more detailed logging for database connection
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Register endpoint
app.post('/auth/register', async (req, res) => {
  console.log('Register request received:', req.body); // Debug log

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log('Missing username or password'); // Debug log
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    // Check for existing user
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    console.log('Existing user check:', existingUser.rows.length); // Debug log

    if (existingUser.rows.length > 0) {
      console.log('Username already exists'); // Debug log
      return res.status(400).json({
        success: false,
        message: 'Username already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );

    console.log('User registered successfully:', result.rows[0]); // Debug log

    res.json({
      success: true,
      userId: result.rows[0].id,
      message: 'Registration successful',
    });
  } catch (error) {
    console.error('Registration error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
});

// Login endpoint
app.post('/auth/login', async (req, res) => {
  console.log('Login request received:', req.body); // Debug log

  try {
    const { username, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      result.rows[0].password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    res.json({
      success: true,
      userId: result.rows[0].id,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Server error during login',
    });
  }
});

// Test endpoint to check database connection
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (error) {
    console.error('Test DB error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// List all users (for debugging)
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
