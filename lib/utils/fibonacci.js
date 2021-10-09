"use strict";

const cache = {
	0: 0,
	1: 1,
	2: 1
};

function fibonacci(index) {

	// Maximum number node.js can display
	if (index > 1476)
		return Infinity;

	if (cache[index])
		return cache[index];
		
	cache[index] = (fibonacci(index - 1) + fibonacci(index - 2));
	return cache[index];
}

module.exports = fibonacci;
