import { anthropic, openai } from "./payload";
import type * as types from "./types";

export function createCompletionFunction(
	model: string,
	type: types.OAIEndpoint | types.AnthropicEndpoint = "chat",
	provider: types.Provider = "OpenAI",
): types.CompletionFunction {
	return (
		prompt: string,
		stream,
		maxTokens = 50,
		history?: types.Message[],
	) => {
		return provider === "OpenAI"
			? openai(prompt, type as types.OAIEndpoint, model, maxTokens, stream)
			: anthropic(
					prompt,
					model,
					maxTokens,
					type as types.AnthropicEndpoint,
					stream,
				);
	};
}
