export const payload = (
	message: string,
	model: string,
	maxTokens: number,
	stream = false,
) => {
	return fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		},
		body: JSON.stringify({
			stream: stream,
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
