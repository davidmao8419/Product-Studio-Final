import express from 'express';
//var express = require("express");
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8080;

const visionG = require('@google-cloud/vision');
const client = new visionG.ImageAnnotatorClient();
const {Storage} = require('@google-cloud/storage');
// Instantiates a client. If you don't specify credentials when constructing
// the client, the client library will look for credentials in the
// environment.
const storage = new Storage();

// Makes an authenticated API request.
storage
  .getBuckets()
  .then((results) => {
    const buckets = results[0];

    console.log('Buckets:');
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

//Log with Morgan
app.use(morgan('dev'));

//accept encoded data as well as json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static files
app.use(express.static(__dirname + '/dist'));

function getKeywords(url, arr) {
	client.labelDetection(url).then (results => {
		const labels = results[0].labelAnnotations;
	
		console.log('Labels:');
		labels.forEach(label => arr.push(label.description));
		console.log("inside keywords");
		console.log(arr);
	})
	.catch(err => {
		console.error('ERROR:', err);
	});
	console.log(arr);
}

app.post('/keywords',  async (req, res) => {
	console.log("request body");
	console.log(req.body);
	const keywords = []
	await getKeywords(req.body['data'], keywords);
	  //const label = labels[0].labelAnnotations;
	setTimeout(function afterTenSeconds() {
		console.log(keywords);
		res.json({
			success: 1,
			message: keywords
		});
	}, 3000)
});

const imageList = [
	{
		key: 0,
		url: "https://process.filestackapi.com/sharpen/negative/sb5RRdoQiiy5l5JUglB1"
	},
	{
		key: 1,
		url: "https://process.filestackapi.com/sharpen/oil_paint/urjTyRrAQA6sUzK2qIsd"
	},
	{
		key: 2,
		url: "https://process.filestackapi.com/sepia/modulate/wxYyL4yQyyRH1RQLZ6gL"
	},
	{
		key: 3,
		url: "https://process.filestackapi.com/blur/pixelate/O9vo0AynTNaNZlRyRBUm"
	},
	{
		key: 4,
		url: "https://process.filestackapi.com/blackwhite/kcirovLQC2eJmA6pkrMD"
	},
	{
		key: 5,
		url: "https://process.filestackapi.com/sharpen/modulate/5V2ZH22ZTWGXv2lMvvVT"
	}
];

app.route('/image')
	.get((req, res) => res.json(imageList))
	.post((req, res) => {
		const { url } = req.body;
		imageList.push({
			key: imageList.length,
			url
		});
		res.json({
			success: 1,
			message:'Image Successfully added!'
		});
	});

app.listen(port);

console.log(`listening on port ${port}`);
//console.log(client);