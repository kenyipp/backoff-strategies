declare const backoff: {

	(options?: backoff.Options): backoff.Calculate;

	(
		/**
		 * 
		 * The base number of delay applied for multiply
		 * 
		 * @default 1000
		 * 
		 */
		delay: number,
		/**
		 * 
		 * The backoff strategy applied. The default strategies include fixed, exponential, fibonacci, linear and polynomial.
		 * 
		 * @default "fixed"
		 */
		strategy: "fixed" | "exponential" | "fibonacci" | "linear" | "polynomial",
		/**
		 * 
		 * Apply random jitter which add 0 ~ 1 seconds to the output.
		 * 
		 * @default false
		 * 
		 */
		jitter: boolean,
		/**
		 * 
		 * While each strategy calculates its delay based on its own logic, you can ensure that the delay returned is always a certain minimum number of seconds. You can apply a minimum by instantiating a strategy with the minimum argument.
		 * 
		 * @default 0
		 * 
		 */
		minimumDelay: number,
		/**
		 * 
		 * Certain strategies - like the Polynomial strategy - can rapidly lead to very long delays between retry attempts. To offset this, while still retaining the shape of the curve between retry attempts, each strategy has a scale_factor property which is multiplied by the "“unadjusted”" delay. This can be used to reduce (or increase) the size (technically the magnitude) of the delay.
		 * 
		 * @default 1
		 * 
		 */
		scaleFactor: number
	): backoff.Calculate;

}

declare namespace backoff {

	interface Options {
		/**
		 * 
		 * The base number of delay applied for multiply
		 * 
		 * @default 1000
		 * 
		 */
		delay: number,
		/**
		 * 
		 * The backoff strategy applied. The default strategies include fixed, exponential, fibonacci, linear and polynomial.
		 * 
		 * @default "fixed"
		 */
		strategy: "fixed" | "exponential" | "fibonacci" | "linear" | "polynomial",
		/**
		 * 
		 * Apply random jitter which add 0 ~ 1 seconds to the output.
		 * 
		 * @default false
		 * 
		 */
		jitter: boolean,
		/**
		 * 
		 * While each strategy calculates its delay based on its own logic, you can ensure that the delay returned is always a certain minimum number of seconds. You can apply a minimum by instantiating a strategy with the minimum argument.
		 * 
		 * @default 0
		 * 
		 */
		minimumDelay: number,
		/**
		 * 
		 * Certain strategies - like the Polynomial strategy - can rapidly lead to very long delays between retry attempts. To offset this, while still retaining the shape of the curve between retry attempts, each strategy has a scale_factor property which is multiplied by the "“unadjusted”" delay. This can be used to reduce (or increase) the size (technically the magnitude) of the delay.
		 * 
		 * @default 1
		 * 
		 */
		scaleFactor: number
	}

	interface Calculate {
		(retry: number): number;
	}

}

export = backoff;
