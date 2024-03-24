import { createCompletionFunction } from "./createCompletionFunction";

export const model = {
	"gpt-3.5-turbo": createCompletionFunction("gpt-3.5-turbo"),
	"gpt-3.5-turbo-0125": createCompletionFunction("gpt-3.5-turbo-0125"),
	"gpt-3.5-turbo-instruct": createCompletionFunction(
		"gpt-3.5-turbo-instruct",
		"completion",
	),
	"gpt-4-turbo-preview": createCompletionFunction("gpt-4-turbo-preview"),
	"gpt-4": createCompletionFunction("gpt-4-turbo-preview"),
	"gpt-4-32k": createCompletionFunction("gpt-4-32k"),
};
