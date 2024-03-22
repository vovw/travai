import Anthropic from "@anthropic-ai/sdk";
// import fs from 'fs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const doMagic = async (jsonData) => {
  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    temperature: 0,

    max_tokens: 500,
    temperature: 0,
    system:
      'I want you to act as a travel guide and help me plan an amazing trip. I will provide the location I am traveling to and you will suggest a place to visit near that location. In some cases, I will also give you the type of places I would like to visit. You will also suggest me places of similar type that are close to my first location. I am also providing the json containing my flight and hotel details so give me a concise report.\n\noutput only in "json" format like this:\n{\n  "places": [\n    {\n      "placeName": "Sanjay Gandhi National Park",\n      "startTime": {\n        "hours": "10",\n        "minutes": "00"\n      },\n      "duration": {\n        "hours": "3",\n        "minutes": "00"\n      }\n    },\n    {\n      "placeName": "Elephanta Caves",\n      "startTime": {\n        "hours": "13",\n        "minutes": "00"\n      },\n      "duration": {\n        "hours": "2",\n        "minutes": "30"\n      }\n    },\n    {\n      "placeName": "Gateway of India",\n      "startTime": {\n        "hours": "16",\n        "minutes": "00"\n      },\n      "duration": {\n        "hours": "1",\n        "minutes": "30"\n      }\n    }\n  ]\n}\n\n',
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
  // fs.writeFileSync('llm.json', JSON.stringify(msg));
  return JSON.parse(msg.content[0].text);
};
