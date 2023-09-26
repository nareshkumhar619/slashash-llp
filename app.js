const express = require('express');
const mysql = require('mysql2');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'movie_favorites'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/search', async (req, res) => {
    const searchQuery = req.body.search;
    try {
        const response = await axios.get(`http://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${searchQuery}`);
        const movies = response.data.Search;
        res.render(__dirname + '/views/search.html', { movies });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

app.post('/favorite', (req, res) => {
    const { title, year, type, poster_url } = req.body;
    const sql = 'INSERT INTO favorites (title, year, type, poster_url) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, year, type, poster_url], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error favoriting movie.');
        } else {
            res.json({ message: 'Movie favorited successfully!' });
        }
    });
});

app.get('/favorites', (req, res) => {
    const sql = 'SELECT * FROM favorites';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching favorites.');
        } else {
            res.render(__dirname + '/views/favorites.html', { favorites: results });
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
