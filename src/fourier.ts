import { completion } from "./utils/completions";
import { streamResponse } from "./utils/streamResponse";


type Config = {
	model: keyof typeof completion;
	stream?: boolean;
};

export class Fourier {
	private config: Config;
	constructor(config: Config) {
		this.config = config;
	}

	async call(prompt: string) {
		return (
			completion[this.config.model](prompt)
				// @ts-expect-error
				.then((response) => response.json())
				.then((data) => data?.choices?.at(0)?.message?.content)
		);
	}

	async stream(prompt: string) {
		const response = await completion[this.config.model](prompt, true);
		const stream = streamResponse(response as Response);
		const reader = stream.getReader();

		let result = "";
		while (true) {
			const { done, value } = await reader.read();
			if (done) {
				break;
			}

			if (value) {
				// Assuming 'value' is a string that looks like:
				// 'data: {...json...}'
				const jsonStr = value.replace(/data:\s/, "")

				if (jsonStr === "[DONE]") {
					break;
				}

				try {
					const jsonObj = JSON.parse(jsonStr);

					const deltaContent = jsonObj.choices[0].delta.content;
					// console.log(deltaContent); // Log the delta content

					result += deltaContent;
				} catch (e) {
					console.error("Failed to parse JSON or access delta content", e);
				}
			}
			result += value;
		}

		return result;
	}
}
