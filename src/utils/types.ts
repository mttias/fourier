export type Message = {
	role: "system" | "user";
	content: string;
};

export type CompletionFunction = (
	message: string,
	stream?: boolean,
	maxTokens?: number,
	history?: Message[],
) => Promise<
	Completion | AsyncGenerator<Completion, void, unknown> | Response | undefined
>;

export type Completion = {
	choices: {
		message?: {
			content: string;
		};
		delta?: {
			content: string;
		};
	}[];
};

export type OAIEndpoint = "chat" | "completion";
export type AnthropicEndpoint = "message" | "completion";

export type Provider = "OpenAI" | "Anthropic";
