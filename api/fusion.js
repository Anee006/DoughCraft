import OpenAI from 'openai'; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { recipeA, recipeB } = req.body;

    const prompt = `
      You are "Doughcraft," a highly creative experimental chef.
      A user wants to fuse two dishes:
      1. ${recipeA}
      2. ${recipeB}
      
      Invent a new, single, hybrid recipe that combines elements of both.
      
      IMPORTANT: Respond with ONLY a valid JSON object in this exact format:
      {
        "title": "Your Creative Fusion Recipe Title (e.g., 'Brownie-Cheesecake Swirls')",
        "description": "A short, fun description of this new fusion dish.",
        "ingredientList": [
          "1 cup flour",
          "8 oz cream cheese"
        ],
        "instructions": [
          "Step 1: Preheat your oven...",
          "Step 2: Prepare the brownie batter..."
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
    res.status(500).json({ error: 'Failed to fuse recipes.' });
  }
}