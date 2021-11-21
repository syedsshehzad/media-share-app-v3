// Import the Amazon S3 service client
var S3 = require('aws-sdk/clients/s3');
var AWS = require('aws-sdk');

/**
 * Gets Cognito Identity Credentials from the user's login session and creates an S3 client using those credentials
 * @param userSession
 * @returns authorized S3 client
 */

var authorize = function (userSession) {

	if (userSession == 'unauthenticated') {
		var credentials = new AWS.CognitoIdentityCredentials(
			{ IdentityPoolId: 'us-east-1:103f298b-1a26-48ef-9ec1-06af9ea8ed3d' },
			{ region: 'us-east-1' }
		);

		var s3 = new S3({
			apiVersion: '2006-03-01',
			region: 'us-east-1',
			credentials: credentials
		});

		s3.getBucketLocation({ Bucket: 'aws-cognito-resources' }, function (err, data) {
			if (err) {
				console.log(err);
			} else {
				console.log(data);
			}
			console.log(s3.config.credentials.expireTime);
		});

		return s3;
	}

	var credentials = new AWS.CognitoIdentityCredentials(
		{
			IdentityPoolId: 'us-east-1:103f298b-1a26-48ef-9ec1-06af9ea8ed3d',
			Logins: {
				// Change the key below according to the specific region your user pool is in.
				'cognito-idp.us-east-1.amazonaws.com/us-east-1_I1UXEGYVr': userSession.idToken.jwtToken
			}
		},
		{
			region: 'us-east-1'
		}
	);

	var s3 = new S3({
		apiVersion: '2006-03-01',
		region: 'us-east-1',
		credentials: credentials
	});

	s3.getBucketLocation({Bucket: 'aws-cognito-resources'}, function(err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
		console.log(s3.config.credentials.expireTime);
	});
	
    return s3;
}

module.exports = authorize;
