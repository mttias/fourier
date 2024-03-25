import { Fourier } from "./fourier";

(async () => {
	const model = new Fourier({ model: "claude-3-opus-20240229" });
	const prompt = "Tell me a fun fact about Fourier!";

	const res = await model.call(prompt);

	console.log(res);
})();
