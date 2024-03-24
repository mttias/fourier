import { completion } from "./utils/completions";

type Config = {
	model: keyof typeof completion;
	stream?: boolean;
};

export function streamResponse(response: Response) {
	const reader = response.body?.getReader();
	const decoder = new TextDecoder();
	let buffer: string | null = "";

	return new ReadableStream({
		start(controller) {
			function push() {
				// If there is no more data to read
				if (buffer === null) {
					controller.close();
					return;
				}

				// Try to get some data and return if it's not possible
				const chunk = reader?.read();
				if (chunk === undefined) {
					return;
				}

				// Decode the chunk and push it to the stream
				chunk.then(({ done, value }) => {
					if (done) {
						buffer = null;
						controller.close();
						return;
					}

					buffer += decoder.decode(value, { stream: true });
					if (!buffer) {
						return;
					}

					const parts = buffer.split("\n");
					buffer = parts.pop() || "";

					for (const part of parts) {
						controller.enqueue(part);
					}

					push();
				});
			}

			push();
		},
		cancel() {
			reader?.cancel();
		},
	});
}

class Fourier {
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
					console.log(deltaContent); // Log the delta content

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

// Usage example in an async context
(async () => {
	const model = new Fourier({ model: "gpt-3.5-turbo" });
	const prompt = "Tell me a fun fact about Fourier!";
	const res = await model.stream(prompt);

})();
