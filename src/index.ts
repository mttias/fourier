import { Fourier } from "./fourier";

(async () => {
	const queue = [];
	const model = new Fourier({ model: "gpt-3.5-turbo" });
	const prompt = "Tell me a fun fact about Fourier!";

	for await (const delta of model.stream(prompt)) {
		queue.push(delta);
		console.log({ delta });
	}
})();
