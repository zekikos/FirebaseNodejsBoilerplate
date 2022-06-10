var firebase = require("firebase-admin");
var auth = function(req, res, next){
	var header = req.headers['authorization'];
	//console.log(req.headers)
	if (!(typeof header === 'string' || header instanceof String)){ next();/*res.sendStatus(400);*/ } else {
		header = header.replace("Bearer ", "");
		firebase.auth().verifyIdToken(header)
		.then((decodedToken) => {
			const uid = decodedToken.uid;
			req.uid = uid;
			next();
		})
		.catch((error) => {
			res.sendStatus(500);
			console.log(error);
		});
	} 
}

module.exports = auth;