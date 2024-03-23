import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
dotenv.config();

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});


export const getCityCode  = async (cityName) => {
    const msg = await anthropic.messages.create({
        model: "claude-3-haiku-20240307",
        temperature: 0,
    
        max_tokens: 100,
        temperature: 0,
        system:
          'I will give you a city name and you will have to give me IATA code used for flights which is 3 characters. Note I only want IATA code in the output. Note that if it is the country then give IATA code for its capital. If its nor city , nor country , then give just give some valid IATA code that could relate to the input',
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