import type * as types from "./types";

export const payload = (
	prompt: string,
	type: types.OAIEndpoint,
	model: string,
	maxTokens: number,
	stream = false,
) => {
	const input =
		type === "chat"
			? {
					messages: [
						{
							role: "system",
							content:
								"You are a helpful assistant. Take a deep breath and relax. You've got this! Look at the prompt and answer step by step. Make sure you get the answer right.",
						},
						{
							role: "user",
							content: prompt,
						},
					],
				}
			: { prompt };

	const link =
		type === "chat"
			? "https://api.openai.com/v1/chat/completions"
			: "https://api.openai.com/v1/completions";

	const q = fetch(link, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			stream: stream,
			model: model,
			max_tokens: maxTokens,
			...input,
		}),
	});

	return q;
};
