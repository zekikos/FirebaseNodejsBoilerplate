const { getStorage } = require('firebase-admin/storage');

async function generateSignedUploadUrl(path, contentType, expireSec, maxSize = 100000){
	const expires = Date.now() + expireSec * 1000;
	const options = {
		expires,
		conditions: [
			["eq", "$Content-Type", "image/jpeg"],
			["content-length-range", 0, maxSize]
		]
	};
	var file = storage.bucket(bucketName).file(path);
	/*file.generateSignedPostPolicyV4(options, function(err, response){
		if(err){
			console.log(err);
			res.sendStatus(400);
			return;
		}
		res.send(response);
	})*/
}