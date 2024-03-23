import { completion } from "./utils/completions";

console.log("Hello via Bun!");

const systemPrompts = {
	standard: "Hello world!",
};

type Config = {
	model: string;
	prompt?: keyof typeof systemPrompts | null;
	stream?: boolean;
};

class Fourier {
	private config: Config;

	constructor(config: Config) {
		this.config = config;
	}

	async call(prompt: string): Promise<void> {
		// Assuming the actual call to the Fourier service is more complex and asynchronous
		console.log(`Response from ${this.config.model}: ${prompt}`);
	}
}

// Usage example in an async context
(async () => {
	const fourier = new Fourier({ model: "gpt4-turbo", prompt: "standard" });
	await fourier.call("Hello world!");

	const query = await completion["gp4-turbo"]();
})();
