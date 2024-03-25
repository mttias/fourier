import type * as types from "./types";

type Payload = {
	prompt: string;
	model: string;
	maxTokens: number;
	type: types.endpoint;
	temperature: number;
	stream: boolean;
};

export const openai = (config: Payload) => {
	const prompt =
		config.type === "chat"
			? {
					messages: [
						{
							role: "system",
							content:
								"You are a helpful assistant. Take a deep breath and relax. You've got this! Look at the prompt and answer step by step. Make sure you get the answer right.",
						},
						{
							role: "user",
							content: config.prompt,
						},
					],
				}
			: { prompt: config.prompt };

	const link =
		config.type === "chat"
			? "https://api.openai.com/v1/chat/completions"
			: "https://api.openai.com/v1/completions";

	const q = fetch(link, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			stream: config.stream,
			model: config.model,
			max_tokens: config.maxTokens,
			temperature: config.temperature,
			...prompt,
		}),
	});

	return q;
};

export const anthropic = (config: Payload) => {
	const prompt =
		config.type === "message"
			? {
					messages: [
						{
							role: "user",
							content: config.prompt,
						},
					],
				}
			: { prompt: `\n\nHuman: ${config.prompt}\n\nAssistant:` };

	const max_tokens =
		config.type === "message"
			? {
					max_tokens: config.maxTokens,
				}
			: {
					max_tokens_to_sample: config.maxTokens,
				};

	const link =
		config.type === "message"
			? "https://api.anthropic.com/v1/messages"
			: "https://api.anthropic.com/v1/complete";

	const query = fetch(link, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": `${process.env.ANTHROPIC_API_KEY}`,
			"anthropic-version": "2023-06-01",
		},
		body: JSON.stringify({
			stream: config.stream,
			model: config.model,
			temperature: config.temperature,
			...max_tokens,
			...prompt,
		}),
	});

	return query;
};
