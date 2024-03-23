import { payload } from "./payload";
import type * as types from "./types";

function createCompletionFunction(model: string): types.CompletionFunction {
	return (
		message: string,
		stream,
		maxTokens = 50,
		history?: types.Message[],
	) => {
		return payload(message, model, maxTokens, stream);
	};
}

export const completion = {
	"gpt-4-turbo-preview": createCompletionFunction("gpt-4-turbo-preview"),
	"gpt-3.5-turbo": createCompletionFunction("gpt-3.5-turbo"),
};
