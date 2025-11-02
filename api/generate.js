import OpenAI from 'openai'; 


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { ingredients, difficulty } = req.body;

  
    const prompt = `
      You are "Doughcraft," a friendly baking assistant.
      A user has these ingredients: ${ingredients}.
      They want to make a recipe with this difficulty: ${difficulty}.
      
      Generate a complete recipe.
      
      IMPORTANT: Respond with ONLY a valid JSON object in this exact format:
      {
        "title": "Your Creative Recipe Title",
        "description": "A short, fun description of the dish.",
        "ingredientList": [
          "1 cup flour",
          "2 large eggs"
        ],
        "instructions": [
          "Step 1: Preheat your oven...",
          "Step 2: Mix the dry ingredients..."
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
    res.status(500).json({ error: 'Failed to generate recipe.' });
  }
}