const express =  require('express');
var app = express();

const port = process.env.PORT || 3000;

// TEMPLATING ENGINE: HANDLEBARS
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


// Aqui asignamos el motor de vistas en el servidor web de express
app.set('view engine', 'hbs');

// --------------- REGISTRO DE MIDDLEWARE -------------------
// ---------------      EN EXPRESS        -------------------
// Esta función hace estatica la carpeta ./public exponiendola para su uso publico
app.use(express.static(__dirname + '/public'))

app.use((request, response, next)=>{
    var now = new Date().toString();
    console.log(`${now}`)
    next();
});


// ---------------------------------------------------------
app.get('/', (request, response)=>{
    response.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: "Welcome to Josema's first server"
    })
});


app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About page 125',
    });
})

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Error: unable to fulfil request'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port 3000');
});