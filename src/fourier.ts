import { model } from "./utils/models";
import { streamResponse } from "./utils/streamResponse";

type Config = {
	model: keyof typeof model;
	stream?: boolean;
};

export class Fourier {
	private config: Config;
	constructor(config: Config) {
		this.config = config;
	}

	/**
	 * Call the API with a prompt, recieve the response asynchronously
	 * @param prompt a string of the user prompt
	 * @returns Promise<string> with the API response message
	 */
	async call(prompt: string): Promise<string> {
		return (
			model[this.config.model](prompt)
				// @ts-expect-error
				.then((response) => response.json())
				.then(
					(data) =>
						data?.choices?.at(0)?.message?.content ??
						data?.choices?.at(0)?.text,
				)
		);
	}

	/**
	 * Streams the response as a generator function
	 * @param prompt a string of the user prompt
	 * @returns a yield of the latest response token
	 */
	async *stream(prompt: string) {
		const response = await model[this.config.model](prompt, true);
		const stream = streamResponse(response as Response);
		const reader = stream.getReader();

		const res = "";

		while (true) {
			const { done, value } = await reader.read();

			if (done) {
				break;
			}

			if (value) {
				// Assuming 'value' is a string that looks like:
				// 'data: {...json...}'
				const jsonStr = value.replace(/data:\s/, "");

				if (jsonStr === "[DONE]") {
					break;
				}

				try {
					const jsonObj = JSON.parse(jsonStr);

					const deltaContent = jsonObj.choices[0].delta.content;

					yield deltaContent;
				} catch (e) {
					console.error("Failed to parse JSON or access delta content", e);
				}
			}
		}
	}
}
