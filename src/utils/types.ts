export type Message = {
	role: "system" | "user";
	content: string;
};

export type CompletionFunction = (
	message: string,
	stream?: boolean,
	temperature?: number,
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

export type endpoint = "chat" | "completion" | "message";

export type Provider = "OpenAI" | "Anthropic";
