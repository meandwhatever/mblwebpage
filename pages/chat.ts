// pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  type Message = { role: "user" | "assistant"; content: string };



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method !== "POST") {
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    //get input
    const { messages } = req.body as { messages: Message[] };
  
    try {
        //get reply
        const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages,
      });
  
      // extract reply and sent
      const reply = completion.choices[0].message;
      return res.status(200).json({ message: reply });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "OpenAI request failed" });
    }
  }