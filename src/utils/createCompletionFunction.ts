import { payload } from "./payload";
import type * as types from "./types";

export function createCompletionFunction(
	model: string,
	type: types.OAIEndpoint = "chat",
): types.CompletionFunction {
	return (
		prompt: string,
		stream,
		maxTokens = 50,
		history?: types.Message[],
	) => {
		return payload(prompt, type, model, maxTokens, stream);
	};
}
