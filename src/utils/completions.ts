import { payload } from "./payload";
import type * as types from "./types";

function createCompletionFunction(model: string, type: types.OAIEndpoint = "chat"): types.CompletionFunction {
	return (
		prompt: string,
		stream,
		maxTokens = 50, 
		history?: types.Message[],
	) => {
		return payload(prompt, type, model, maxTokens, stream);
	};
}

export const completion = {
	"gpt-4-turbo-preview": createCompletionFunction("gpt-4-turbo-preview"),
	"gpt-3.5-turbo": createCompletionFunction("gpt-3.5-turbo"),
	"gpt-3.5-turbo-instruct": createCompletionFunction("gpt-3.5-turbo-instruct", "completion"),
};
