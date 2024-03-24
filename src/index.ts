import { Fourier } from "./fourier";

(async () => {
	const model = new Fourier({ model: "gpt-4-0125-preview" });
	const prompt = "Tell me a fun fact about Fourier!";

	const res = await model.call(prompt);

	console.log(res);
})();
