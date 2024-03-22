import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const doMagic = async (
  jsonData
) => {
  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 500,
    temperature: 0,
    system:
      "I want you to act as a travel guide and help me plan an amazing trip. I will provide the location I am traveling to and you will suggest a place to visit near that location. In some cases, I will also give you the type of places I would like to visit. You will also suggest me places of similar type that are close to my first location. I am also providing the json containing my flight and hotel details so give me a concise report.\n\noutput only in json format for the places to go and things to do \n",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: jsonData,
          },
        ],
      },
    ],
  });
  return JSON.parse(msg.content[0].text)
}