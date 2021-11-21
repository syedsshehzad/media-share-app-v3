var AmazonCognitoIdentity = require('amazon-cognito-auth-js');
import { APP_CLIENT_ID, APP_WEB_DOMAIN, REDIRECT_URI } from './environmental_variables.js';

/**
 * A CognitoAuth object using hardcoded options with success and error handlers
 */

var authData = {
	ClientId: APP_CLIENT_ID,
	AppWebDomain: APP_WEB_DOMAIN,
	TokenScopesArray: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
	RedirectUriSignIn: REDIRECT_URI,
	RedirectUriSignOut: REDIRECT_URI,
	// IdentityProvider : '<TODO: add identity provider you want to specify>', e.g. 'Facebook',
	UserPoolId: 'us-east-1_I1UXEGYVr', // Your user pool id here
	AdvancedSecurityDataCollectionFlag: 'true',
	Storage: localStorage
};

export var auth = new AmazonCognitoIdentity.CognitoAuth(authData);

auth.userhandler = {
	onFailure: function (err) {
		alert(err);
		console.log(err);
	},
	onSuccess: function (authSession) {
		console.log(authSession);
	}
};
