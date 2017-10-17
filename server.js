const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

// middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method}: ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log+ '\n');
	next();
});

/*app.use((req, res, next) => {
	res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname+'/public'));

// partials
hbs.registerPartials(__dirname + '/views/partials');
// helpers
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});


app.get('/', (req, res) => {
	// res.send('<h1>Hello express</h1>');
	// res.send({
	// 	name: 'Midhun',
	// 	likes: [
	// 			'Badminton',
	// 			'Pc Games'
	// 		]
	// });
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		// currentYear: new Date().getFullYear(),
		welcomeMsg: 'Welcome fuckers.. Fuckk OFF!!! Bitch :)'
	});
});

app.get('/about', (req, res) => {
	// res.send('About Page');
	res.render('about.hbs',{
		pageTitle: 'About Page',
	});
});

app.get('/projects', (req, res) => {
	// res.send('About Page');
	res.render('project.hbs',{
		pageTitle: 'Project Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		error: 'bad request'
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server started listening to http://localhost:${process.env.PORT || 3000}`);
});
