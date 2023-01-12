const path = require('path');
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
const { query } = require('express');

// EXPRESS Config
const app = express();
app.set('view engine', 'hbs');

// RENDERING STATIC FILES
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
// console.log(viewsPath)


// Reading 
const apiData = fs.readFileSync(`${__dirname}/data/.json`, 'utf-8');
const apiDataObj = JSON.parse(apiData);
console.log(apiData);
// fs.readFile('./data/.json', 'utf-8', ((err, data) => {
//     console.log(data);
// }));

// PORT Config
const port = 8000;

// EXPRESS ROUTING
// app.get('/', (req, res) => {
//     res.send('<h1>This is the Homepage</h1>');
// });


app.get('/', (req, res) => {
    res.render('index', {
        app: 'Exprss Application 🌎',
        page: 'Dashboard 👮‍♀️'
    });        // METHOD FOR HBS
})

app.get('/about', (req, res) => {
    res.render('about', {
        app: 'Express Application 🌎',
        page: 'About page 🙋‍♀️'
    });            //METHOD FOR HBS
})

// app.get('/about', (req, res) => {
//     res.send('<h1>This is the About page</h1>');
// });


app.get('/api', (req, res) => {
    if (!req.query.search) {
        res.send({
            err: 'You have to put a search term'
        })
    } else {
        // console.log(req.query.search);
        res.send({ name: 'Kehinde', location: 'Nigeria' });
    }

});


app.get('*', (req, res) => {
    res.send('<h1>Page not Found</h1>');
});













// EXPRESS LISTEN Port
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
})
