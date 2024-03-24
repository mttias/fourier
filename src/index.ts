import { Fourier } from "./fourier";

const queue = [];

(async () => {
	const model = new Fourier({ model: "gpt-3.5-turbo-instruct" });
	const prompt = "Tell me a fun fact about Fourier!";

	const res = await model.call(prompt);

	console.log(res);
})();
