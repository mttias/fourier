import { Fourier } from "./fourier";

(async () => {
	const model = new Fourier({
		model: "davinci-002",
		temperature: 0.6,
	});
	const prompt = "Tell me a fun fact about Fourier!";

	const res = await model.call(prompt);

	console.log(res);
})();
