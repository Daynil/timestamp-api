'use strict';
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

app.use(morgan('dev'));

let pathname = path.join(process.cwd());
app.use( express.static(pathname) );

app.get('/:dateString', (req, res) => {
	// We're getting seconds, date constructor takes milliseconds
	let numberParse = parseInt(req.params.dateString, 10)*1000;
	let parsedQuery;
	if (isNaN(numberParse)) parsedQuery = new Date(req.params.dateString);
	else parsedQuery = new Date(numberParse);
	
	if (isNaN(parsedQuery)) res.status(400).json({ 'unix': null, 'natural': null });
	else {
		let formatOptions = {
			month: 'long', day: 'numeric', year: 'numeric'
		}
		let unixTime = parsedQuery.valueOf()/1000;
		let naturalLangDate = parsedQuery.toLocaleDateString('en-US', formatOptions);
		res.status(200).json({ 'unix': unixTime, 'natural': naturalLangDate });
	}
});

app.listen(3000, () => console.log('Listening on port 3000...'));