import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    // Extract data from the request body
    const { jobPosition, jobDescription, duration, type } = await req.json();

    // Build the final prompt
    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    console.log("FINAL_PROMPT:", FINAL_PROMPT);

    // Initialize Gemini with API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Choose model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(FINAL_PROMPT);
    const response = await result.response;
    const text = response.text();

    console.log("GEMINI RESPONSE:", text);

    // Return JSON response
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
