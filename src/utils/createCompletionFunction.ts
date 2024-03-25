import { anthropic, openai } from "./payload";
import type * as types from "./types";
import { match } from "ts-pattern";

export function createCompletionFunction(
	model: string,
	type: types.endpoint,
	provider: types.Provider = "OpenAI",
): types.CompletionFunction {
	return (
		prompt: string,
		stream = false,
		temperature = 0.8,
		maxTokens = 50,
		history?: types.Message[],
	) => {
		const input = {
			prompt,
			model,
			type,
			temperature,
			maxTokens,
			history,
			stream,
		};

		return match(provider)
			.with("OpenAI", () => openai(input))
			.with("Anthropic", () => anthropic(input))
			.run();
	};
}
