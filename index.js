const express = require('express');
const path = require('path'); 
const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'pages'));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);


app.use(express.static(path.join(__dirname, 'resources')));

// Define a route for the homepage
app.get('/', (req, res) => {
    res.render('index', { title: 'Homepage' });
});

// Define routes
app.get('/products', (req, res) => {
    res.render('products', { title: 'Product catalog' });
});

app.get('/buy/:productId', (req, res) => {
    console.log(req.params.productId);
    res.render('completion', { title: 'Checkout' });
});

app.get('/view/:productId', (req, res) => {
    console.log(req.params.productId);
    res.render('productdetail', { title: 'Product Description' });
});


app.get('/other', (req, res) => {
    res.render('other', { title: 'Something else' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About shop' });
});

app.get('/bestCustomers', (req, res) => {
    res.render('best', { title: 'Loyal customers' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});