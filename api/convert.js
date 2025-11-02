import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { originalRecipe, modification } = req.body;

    const prompt = `
      You are "Doughcraft," a friendly baking assistant.
      A user has this original recipe: ${originalRecipe}.
      They want to modify it to be: ${modification}.
      
      Generate a new, complete recipe based on this modification.
      
      IMPORTANT: Respond with ONLY a valid JSON object in this exact format:
      {
        "title": "Your New Modified Recipe Title",
        "summaryOfChanges": "A short summary of what you changed (e.g., 'I replaced the eggs with flaxseed...')",
        "ingredientList": [
          "1 cup flour",
          "2 tbsp flaxseed"
        ],
        "instructions": [
          "Step 1: Preheat your oven...",
          "Step 2: Mix the flaxseed and water..."
        ]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const recipeJson = completion.choices[0].message.content;
    res.status(200).json(JSON.parse(recipeJson));

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to convert recipe.' });
  }
}