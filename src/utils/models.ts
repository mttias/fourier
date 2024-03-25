import { createCompletionFunction } from "./createCompletionFunction";

export const model = {
	"davinci-002": createCompletionFunction("davinci-002", "completion"),
	"gpt-3.5-turbo": createCompletionFunction("gpt-3.5-turbo", "chat"),
	"gpt-3.5-turbo-0125": createCompletionFunction("gpt-3.5-turbo-0125", "chat"),
	"gpt-3.5-turbo-instruct": createCompletionFunction(
		"gpt-3.5-turbo-instruct",
		"completion",
	),
	"gpt-4-turbo-preview": createCompletionFunction(
		"gpt-4-turbo-preview",
		"chat",
	),
	"gpt-4": createCompletionFunction("gpt-4-turbo-preview", "chat"),
	"gpt-4-32k": createCompletionFunction("gpt-4-32k", "chat"),
	"claude-3-opus-20240229": createCompletionFunction(
		"claude-3-opus-20240229",
		"message",
		"Anthropic",
	),
	"claude-2.1": createCompletionFunction(
		"claude-2.1",
		"completion",
		"Anthropic",
	),
};
