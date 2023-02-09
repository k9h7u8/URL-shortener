const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrls');

const app = express();

const dotenv = require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Connected to MongoDB Database");
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index', { shortUrls: shortUrls });
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    res.redirect('/');
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
    // console.log(shortUrl);
    if (shortUrl === null) return res.sendStatus(404);
    shortUrl.clicks++;
    shortUrl.save();
    res.redirect(shortUrl.full);
})

const port = process.env.PORT || 5050;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});