const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

mongoose.connect('mongodb+srv://root:root@maincluster.byukcdl.mongodb.net/')
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => console.error('DB connection error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: Number,
  password: String,
  userid: String,
});
const NewUsers = mongoose.model('NewUsers', userSchema);

const sessionSchema = new mongoose.Schema({
  username: String,
  userId: String,
  sessionId: String,
  loginTime: Date,
});
const Session = mongoose.model('Session', sessionSchema);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  key: 'userid',
  secret: "thisisrandomstuff",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 96,
  },
}));

const sessionChecker = (req, res, next) => {
  if (req.session.userId && req.cookies.userid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
};

const authenticateUser = (req, res, next) => {
  if (req.session.userId && req.cookies.userid) {
    next();
  } else {
    res.redirect('/login');
  }
};

app.get('/', sessionChecker, (req, res) => {
  res.redirect('/login');
});

// ... Dashboard Route ...

app.get('/login', async (req, res) => {
  const authenticated = req.session.authenticated || false;
  res.json({ authenticated });
});

app.post('/register', async (req, res) => {
  try {
    const generatedUserID = generateAlphanumericID(10);
    const user = new NewUsers({
      name: req.body.username,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
      userid: generatedUserID,
    });

    const doc = await user.save();
    res.json(doc);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      error: 'Error registering user.'
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await NewUsers.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Create a new Session document in the Session collection
    const session = new Session({
      username: user.username,
      userId: user._id,
      sessionId: req.session.id,
      loginTime: new Date(),
    });
    await session.save();

    // Set the user data in the session
    req.session.userId = user._id; // Store user ID in the session
    req.session.authenticated = true; // Mark as authenticated
    req.session.save(); // Save session changes

    res.status(200).json({ message: 'Login Successful', sessionId: req.session.id });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Error during login' });
  }
});

app.post('/logout', authenticateUser, async (req, res) => {
  try {
    // Remove the session document from the Session collection
    await Session.findOneAndDelete({ sessionId: req.session.id });

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.status(200).json({ message: 'Logged out' });
    });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Error during logout' });
  }
});
// Middleware to check session and redirect to dashboard if user is authenticated
app.use((req, res, next) => {
  if (req.session.user && req.cookies.userid) {
    res.redirect('/dashboard');
  } else {
    next();
  }
});

function generateAlphanumericID(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
