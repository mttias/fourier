# fourier

To install dependencies:

```bash
bun install
```

## Prompt the API

Example:
```
const model = new Fourier({ model: "gpt-3.5-turbo" });
const prompt = "Tell me a fun fact about Fourier!";

const res = await model.call(prompt)
```

## Stream the response

Example:
```
const queue = []
const model = new Fourier({ model: "gpt-3.5-turbo" });
const prompt = "Tell me a fun fact about Fourier!";

for await (const delta of model.stream(prompt)) {
    queue.push(delta)
}
```