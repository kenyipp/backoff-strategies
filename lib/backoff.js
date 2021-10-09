"use strict";
const strategies = require("./strategies");
const getRandomInt = require("./utils/getRandomInt");

const DEFAULT_OPTIONS = {
	delay: 1000,
	strategy: "fixed",
	jitter: false,
	minimumDelay: 0,
	scaleFactor: 1.0
};

function backoff() {

	const options = Object
		.assign(
			{},
			DEFAULT_OPTIONS,
			typeof arguments[0] === "object" ?
				arguments[0] :
				{
					delay: arguments[0],
					strategy: arguments[1],
					jitter: arguments[2],
					minimumDelay: arguments[3],
					scaleFactor: arguments[4]
				}
		);

	const strategy = strategies.get(options.strategy);

	return function (attempt = 0) {
		let time = strategy(options.delay)(attempt);
		if (options.jitter) {
			time += getRandomInt(1000);
		}
		if (Number.isSafeInteger(options.scaleFactor)){
			time *= options.scaleFactor;
		}
		if (Number.isSafeInteger(options.minimumDelay) && time < options.minimumDelay) {
			time = options.minimumDelay;
		}
		return time;
	}
}

module.exports = backoff;
module.exports.strategies = strategies;
