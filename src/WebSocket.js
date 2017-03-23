"use strict";

import Parse from 'parse';
import request from 'request';

const LOG_PREFIX = 'parse-server-push-adapter WebSocket';

function Sender(appId, webSocketUrl) {
	this.appId = appId;
	this.webSocketUrl = webSocketUrl;
}

function WebSocket(args) {
	if (typeof args !== 'object' || !args.appId || !args.webSocketUrl) {
		throw new Parse.Error(Parse.Error.PUSH_MISCONFIGURED,
			'WebSocket Configuration is invalid');
	}
	this.sender = new Sender(args.appId, args.webSocketUrl);
}

WebSocket.prototype.send = function(data, devices) {
	var player_ids = []
	for (var i = 0; i < devices.length; i++) {
		player_ids.push(devices[i].deviceToken);
	}
	request(
		{
			method: 'POST',
			uri: this.sender.webSocketUrl,
			headers: {
				"authorization": this.sender.appId,
				"content-type": "application/json"
			},
			json: true,
			body: {
				'include_player_ids': player_ids,
				'data': data.data
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

module.exports = WebSocket;
export default WebSocket;