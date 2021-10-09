"use strict";
const fibonacci = require("./utils/fibonacci");

const builtinStrategies = {
	/**
	   * 
	   * A strategy whereby an operation is retried on failure 
	   * after an explicitly specified delay.
	   * 
	   */
	fixed(delay) {
		return function () {
			return delay;
		}
	},

    /**
     * 
     * A strategy whereby an operation is retried on failure 
     * given a randomized delay that raises 2 to 
     * the power of the number of attempts that have been made.
     * 
     */
	exponential(delay) {
		return function (attempts) {
			return Math.round((Math.pow(2, attempts) - 1) * delay);
		}
	},

	/**
	 * 
	 * The base delay time is returned as the Fibonacci number corresponding to the current attempt.
	 * 
	 */
	fibonacci(delay) {
		return function (attempts) {
			return fibonacci(attempts) * delay;
		}
	},

	/**
	 * 
	 * The base delay time is equal to the attempt count.
	 * 
	 */
	linear(delay) {
		return function (attempts) {
			return attempts * delay;
		}
	},

	polynomial(delay, exponent = 2) {
		return function (attempts) {
			return Math.round((Math.pow(exponent, attempts) - 1) * delay);
		}
	}
};
const customStrategies = {};

const proxy = {
	get(strategy) {
		if (customStrategies[strategy]) {
			return customStrategies[strategy];
		}
		if (builtinStrategies[strategy]) {
			return builtinStrategies[strategy];
		}
		throw new Error("Invalid strategies #" + strategy)
	},
	addStrategies(name, fn) {
		customStrategies[name] = fn;
	}
};

Object.defineProperties(
	proxy,
	{
		availableStrategies: {
			get() {
				return [].concat(Object.keys(builtinStrategies), Object.keys(customStrategies));
			},
			enumerable: true
		}
	}
);

module.exports = proxy;
