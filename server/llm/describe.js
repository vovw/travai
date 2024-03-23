import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
dotenv.config();

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});


export const cityDetail = async (cityName) => {
    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        temperature: 0,
    
        max_tokens: 1000,
        temperature: 0.5,
        system:
          'I want you to give significance and facts in about 100 words about the place which I am giving you . This will be the destination where user will be taking trip',
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: cityName,
              },
            ],
          },
        ],
      });
      console.log(msg.content[0].text);
      return msg.content[0].text;
}