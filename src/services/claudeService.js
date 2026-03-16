const CLAUDE_API_KEY = process.env.EXPO_PUBLIC_CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const buildPrompt = (code, language) => {
  return `You are an expert code reviewer. Review the following ${language} code and provide structured feedback.

You MUST respond with ONLY a valid JSON object — no extra text, no markdown, no explanation outside the JSON.

The JSON must follow this exact structure:
{
  "score": <number between 0-100>,
  "bugs": [<string>, <string>],
  "improvements": [<string>, <string>],
  "quality": [<string>, <string>]
}

Rules:
- "score" is an overall code quality score from 0 to 100
- "bugs" is a list of actual bugs or errors found (empty array if none)
- "improvements" is a list of suggested improvements
- "quality" is a list of code quality observations
- Each item should be a clear, helpful single sentence
- Maximum 5 items per array
- If no bugs found, return empty array for bugs

Code to review:
\`\`\`${language}
${code}
\`\`\`

Respond with ONLY the JSON object:`;
};

export const reviewCode = async (code, language) => {
  if (!CLAUDE_API_KEY) {
    throw new Error('API key not found. Check your .env file.');
  }

  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: buildPrompt(code, language),
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'API request failed');
  }

  const data = await response.json();
  const text = data.content[0].text.trim();

  // Parse the JSON response
  const clean = text.replace(/```json|```/g, '').trim();
  const review = JSON.parse(clean);

  return review;
};