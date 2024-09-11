const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3400;

app.use(express.json());
let idCounter = 1; // Simple counter to track pet entries

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Set view engine and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Paths to files
const loginFilePath = path.join(__dirname, 'login.txt');
const petsFilePath = path.join(__dirname, 'pets.txt');

// Helper function to read file
const readFile = (filePath, callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            callback(err, null);
        } else {
            callback(null, data);
        }
    });
};

// Helper function to write file
const writeFile = (filePath, data, callback) => {
    fs.writeFile(filePath, data, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file ${filePath}:`, err);
            callback(err);
        } else {
            callback(null);
        }
    });
};

// Routes
app.get('/', (req, res) => res.render('index', { user: req.session.user }));
app.get('/browse', (req, res) => res.render('browse', { user: req.session.user }));
app.get('/dog_care', (req, res) => res.render('dog_care', { user: req.session.user }));
app.get('/find_pet', (req, res) => res.render('find_pet', { user: req.session.user }));
app.get('/cat_care', (req, res) => res.render('cat_care', { user: req.session.user }));
app.get('/contactUs', (req, res) => res.render('contactUs', { user: req.session.user }));
app.get('/privacy', (req, res) => res.render('privacy', { user: req.session.user }));
app.get('/create_account', (req, res) => res.render('create_account', { user: req.session.user }));
app.get('/login', (req, res) => res.render('login', { user: req.session.user }));
app.get('/header', (req, res) => {
    res.render('partials/header', { user: req.session.user });
});



// Login 
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    readFile(loginFilePath, (err, data) => {
        if (err) return res.status(500).render('login', { error: 'Error reading login file.', success: null });

        const lines = data.trim().split('\n');
        const userExists = lines.some(line => {
            const [fileUser, filePass] = line.split(':');
            return fileUser === username && filePass === password;
        });

        if (userExists) {
            req.session.user = username;
            const redirectUrl = req.session.redirectUrl || '/'; // Redirect to the saved URL or homepage
            req.session.redirectUrl = null; // Clear the redirect URL after login
            res.redirect(redirectUrl);
        } else {
            res.status(401).render('login', { error: 'Invalid username or password.', success: null });
        }
    });
});


// Middleware to check if user is authenticated
const ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    res.redirect('/login'); // User is not authenticated, redirect to login page
};

app.get('/giveaway', ensureAuthenticated, (req, res) => {
    res.render('giveaway', { user: req.session.user });
});


// Register new user
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    readFile(loginFilePath, (err, data) => {
        if (err) return res.status(500).render('create_account', { error: 'Error reading login file.', success: null });

        const lines = data.trim().split('\n');
        const userExists = lines.some(line => line.startsWith(username + ':'));

        if (userExists) {
            res.status(400).render('create_account', { error: 'Username already exists.', success: null });
        } else {
            const newEntry = `${username}:${password}\n`;
            writeFile(loginFilePath, data + newEntry, (err) => {
                if (err) return res.status(500).render('create_account', { error: 'Error writing to login file.', success: null });

                res.render('create_account', { success: 'Account successfully created!', error: null });
            });
        }
    });
});

// Log out
app.get('/logout', (req, res) => {
    if (!req.session.user) {
        // If no user session exists, redirect to homepage or another page
        return res.redirect('/');
    }

    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        // Render the logout.ejs template
        res.render('logout');
    });
});

app.post('/submitPetForm', (req, res) => {
    const petData = req.body;
    const username = req.session.user; // Assuming user is logged in and username is stored in session
    if (!username) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    // Construct the pet record
    const record = `${idCounter}:${username}:${petData.pet}:${petData.breed || petData.otherBreed}:${petData.age}:${petData.sex}:${petData.getAlong || 'none'}:${petData.neutered}:${petData.reason}:${petData.additionalInfo}`;

    // Append record to the file
    const filePath = path.join(__dirname, 'pets.txt');
    fs.appendFile(filePath, `${record}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        idCounter++; // Increment the counter for the next record
        res.json({ success: true });
    });
});

app.post('/browse', (req, res) => {
    res.redirect('/browse');
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
