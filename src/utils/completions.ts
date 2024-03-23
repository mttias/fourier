import type * as types from "./types";

const payload = (message: string, model: string, maxTokens = 30) => {
	return fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			model: model,
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant. Take a deep breath and relax. You've got this! Look at the prompt and answer step by step. Make sure you get the answer right.",
				},
				{
					role: "user",
					content: message,
				},
			],
			max_tokens: maxTokens,
		}),
	});
};

export const completion = {
	"gp4-turbo": (message: string, maxTokens = 30, history?: types.Message[]) => {
		return (
			payload(message, "gpt-4-turbo-preview", maxTokens)
				.then((response) => response.json())
				// @ts-expect-error
				.then((data) => data?.choices?.at(0).message.content)
		);
	},
};
