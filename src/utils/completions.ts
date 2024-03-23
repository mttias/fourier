import type * as types from "./types";
import { $ } from "bun";

export const completion = {
	"gp4-turbo": (
		messages: types.Message[] = [
			{
				role: "system",
				content: "You are a helpful assistant.",
			},
			{
				role: "user",
				content: "Tell me a fun fact about Fourier!",
			},
		],
	) => {
		return $`
    curl "https://api.openai.com/v1/chat/completions" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${process.env.OPENAI_API_KEY}" \
      -d '{
        "model": "gpt-4-turbo-preview",
        "messages": ${JSON.stringify(messages, null, 2)}
      }'`;
	},
};
