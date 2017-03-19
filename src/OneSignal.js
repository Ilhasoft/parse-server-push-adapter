"use strict";

import Parse from 'parse';
import request from 'request';

const LOG_PREFIX = 'parse-server-push-adapter OneSignal';

function Sender(restKey, appId) {
	this.restKey = restKey;
	this.appId = appId;
}

function OneSignal(args) {
	if (typeof args !== 'object' || !args.restKey || !args.appId) {
		throw new Parse.Error(Parse.Error.PUSH_MISCONFIGURED,
			'OneSignal Configuration is invalid');
	}
	this.sender = new Sender(args.restKey, args.appId);
}

OneSignal.prototype.send = function(data, devices) {
	var player_ids = []
	for (var i = 0; i < devices.length; i++) {
		player_ids.push(devices[i].deviceToken);
	}

	request(
		{
			method: 'POST',
			uri: 'https://onesignal.com/api/v1/notifications',
			headers: {
				"authorization": "Basic " + this.sender.restKey,
				"content-type": "application/json"
			},
			json: true,
			body: {
				'app_id': this.sender.appId,
				'contents': { en: data.data.alert },
				'include_player_ids': player_ids
			}
		},
		function (error, response, body) {
			if (!body.errors) {
				console.log(body);
			} else {
				console.error('Error:', body.errors);
			}
		}
	);
}

module.exports = OneSignal;
export default OneSignal;