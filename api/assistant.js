import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    
    const { blogDraft, helpType } = req.body;

   
    const prompt = `
      You are "Doughcraft," a friendly baking assistant.
      A user is writing a blog post. Their draft is: "${blogDraft}".
      They need help with this specific request: "${helpType}".
      
      Generate a helpful suggestion.
      
      IMPORTANT: Format your response as a simple HTML string and provide it in a JSON object.
      - If they ask for a 'Title', return an <h3> with a <ul> of 3-5 titles.
      - If they ask for an 'Intro', return an <h3> with a <p> for the intro.
      - If they ask for 'Tags', return an <h3> with a <p> of comma-separated tags.

      Respond with ONLY a valid JSON object in this exact format:
      {
        "html_suggestion": "<h3>Here are some titles:</h3><ul><li>Title 1</li>...</ul>"
      }
    `;

   
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    
    const suggestionJson = completion.choices[0].message.content;
    res.status(200).json(JSON.parse(suggestionJson));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get suggestion.' });
  }
}