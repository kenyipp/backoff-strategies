# Backoff Strategies
Javascript Library for Backoff/Retry Strategies with zero dependencies

## Install
```
$ npm install --save @kenyip/backoff-strategies
```

## Usage
```js
const backoffStrategies = require("@kenyip/backoff-strategies");

const backoff = backoffStrategies({
	delay: 1000,
	strategy: "fibonacci",
	jitter: false,
	minimumDelay: 1000,
	scaleFactor: 1
});

console.log(backoff(1));
// 1000

console.log(backoff(2));
// 1000

console.log(backoff(3));
// 1000

console.log(backoff(4));
// 3000
```

## API

### backoffStrategies(options?)
Returns a function that accepts number of attempt as argument and returns the milliseconds you should wait before next retry.

#### options

Type: `object`

##### delay
Type: `number`
Default: 1000

The base number of delay applied for multiply.

##### strategy
Type: `string`
Default: `fixed`

The backoff strategy applied. The default strategies include `fixed`, `exponential`, `fibonacci`, `linear` and `polynomial`.

##### jitter
Type: `boolean`
Default: false

Apply random jitter which add 0 ~ 1 seconds to the output.

##### minimumDelay
Type: `number`
Default: 0

While each strategy calculates its delay based on its own logic, you can ensure that the delay returned is always a certain minimum number of seconds. You can apply a minimum by instantiating a strategy with the minimum argument. 

##### scaleFactor
Type: `number`
Default: 1

Certain strategies - like the Polynomial strategy - can rapidly lead to very long delays between retry attempts. To offset this, while still retaining the shape of the curve between retry attempts, each strategy has a scale_factor property which is multiplied by the "“unadjusted”" delay. This can be used to reduce (or increase) the size (technically the magnitude) of the delay.

## Related
- [delay](https://www.npmjs.com/package/delay) - Delay a promise a specified amount of time
