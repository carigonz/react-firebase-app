const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
	console.log('tesst log');
	response.send('Hello from index.js!');
});

exports.uploadList = functions.https.onRequest((request, response) => {
	console.log('tesst log');
	response.send('Hello from index.js!');
});

const products = admin.firestore().collection('products');
console.log(products);

function getList(data) {
	/* return {
		data: [
			{
				name: 'pepe',
				code: 23423,
				descriptionc: 'pepe re piole'
			},
			{
				name: 'juan',
				code: 32442342,
				description: 'sdadasdasdas'
			}
		]
	};*/
	let promise = fetch('https://pokeapi.co/api/v2/evolution-chain/?limit=20');
	return promise;
}

getList()
	.then(response => {
		console.log(response.body);
		const obj = response.json();
		return obj;
	})
	.then(response => {
		const newPRoduct = { ...response };
		console.log('llegué hasta aca', newPRoduct);
		return newPRoduct.then();
	});
