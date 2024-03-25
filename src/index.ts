import { Fourier } from "./fourier";

(async () => {
	const model = new Fourier({
		model: "gpt-3.5-turbo-instruct",
		temperature: 1.5,
	});
	const prompt = "Tell me a fun fact about Fourier!";

	const res = await model.call(prompt);

	console.log(res);
})();
