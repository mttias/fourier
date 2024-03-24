export function streamResponse(response: Response) {
	const reader = response.body?.getReader();
	const decoder = new TextDecoder();
	let buffer: string | null = "";

	return new ReadableStream({
		start(controller) {
			function push() {
				// If there is no more data to read
				if (buffer === null) {
					controller.close();
					return;
				}

				// Try to get some data and return if it's not possible
				const chunk = reader?.read();
				if (chunk === undefined) {
					return;
				}

				// Decode the chunk and push it to the stream
				chunk.then(({ done, value }) => {
					if (done) {
						buffer = null;
						controller.close();
						return;
					}

					buffer += decoder.decode(value, { stream: true });
					if (!buffer) {
						return;
					}

					const parts = buffer.split("\n");
					buffer = parts.pop() || "";

					for (const part of parts) {
						controller.enqueue(part);
					}

					push();
				});
			}

			push();
		},
		cancel() {
			reader?.cancel();
		},
	});
}