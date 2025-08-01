import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const calculateDishCalories = async (
  dishName: string,
  description?: string,
): Promise<string> => {
  try {
    const prompt = `You are a professional nutritionist. Calculate the estimated calories for the following dish:

Dish Name: ${dishName}
${description ? `Description: ${description}` : ""}

Please provide:
1. Estimated calories per serving

Format your response in a clear, professional manner. Be as accurate as possible based on typical recipes and portions for this type of dish.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a professional nutritionist and chef with expertise in calculating dish calories. Provide accurate, helpful nutritional information.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 100,
      temperature: 0.3, // Lower temperature for more consistent results
    });

    return (
      response.choices[0]?.message?.content ||
      "Unable to calculate calories at this time."
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to calculate calories. Please try again later.");
  }
};

export const getDishNutritionAdvice = async (
  dishName: string,
  description?: string,
): Promise<string> => {
  try {
    const prompt = `As a nutritionist, provide healthy modification suggestions for this dish:

Dish Name: ${dishName}
${description ? `Description: ${description}` : ""}

Please suggest:
1. Healthier cooking methods
2. Ingredient substitutions to reduce calories
3. Portion control tips
4. Nutritional benefits if any

Keep suggestions practical and realistic.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a professional nutritionist focused on providing practical, healthy eating advice.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 50,
      temperature: 0.4,
    });

    return (
      response.choices[0]?.message?.content ||
      "Unable to provide nutrition advice at this time."
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error("Failed to get nutrition advice. Please try again later.");
  }
};
