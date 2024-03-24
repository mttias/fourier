import { Fourier } from "./fourier";


// Usage example in an async context
(async () => {
	const model = new Fourier({ model: "gpt-3.5-turbo" });
	const prompt = "Tell me a fun fact about Fourier!";
	const res = await model.stream(prompt);

})();
