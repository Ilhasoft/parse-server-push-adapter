"use strict";

import Parse from 'parse';
import request from 'request';

const LOG_PREFIX = 'parse-server-push-adapter OneSignal';

function Sender(restKey, appId) {
	this.restKey = restKey;
	this.appId = appId;
}

Sender.prototype.send = function(message, recipient, options, callback) {
	console.log('---- Sender.prototype.send ----');
	console.log(message);
	console.log(recipient);
	console.log(options);
	console.log(this.restKey);
	console.log(this.appId);
}

function OneSignal(args) {
	if (typeof args !== 'object' || !args.restKey || !args.appId) {
		throw new Parse.Error(Parse.Error.PUSH_MISCONFIGURED,
			'OneSignal Configuration is invalid');
	}
	this.sender = new Sender(args.restKey, args.appId);
}

OneSignal.prototype.send = function(data, devices) {
	console.log('---- OneSignal.prototype.send ----');
	console.log(data);
	console.log(devices);
	// request(
	// 	{
	// 		method: 'POST',
	// 		uri: 'https://onesignal.com/api/v1/notifications',
	// 		headers: {
	// 			"authorization": "Basic " + restKey,
	// 			"content-type": "application/json"
	// 		},
	// 		json: true,
	// 		body: {
	// 			'app_id': appId,
	// 			'contents': { en: message },
	// 			'include_player_ids': Array.isArray(device) ? device : [device]
	// 		}
	// 	},
	// 	function (error, response, body) {
	// 		if (!body.errors) {
	// 			console.log(body);
	// 		} else {
	// 			console.error('Error:', body.errors);
	// 		}

	// 	}
	// );
}

// sendMessage('a9fb63b1-b5cc-4ee9-92f0-5be15eb300c0', 'Hello!');

module.exports = OneSignal;
export default OneSignal;