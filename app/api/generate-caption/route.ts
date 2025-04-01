import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Set the maximum duration for this API route
export const maxDuration = 30 // 30 seconds

export async function POST(request: Request) {
  try {
    const { keywords, mood, style, platform } = await request.json()

    // Check if all required fields are provided
    if (!keywords || !mood || !style || !platform) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("Generating caption with parameters:", { keywords, mood, style, platform })

    // Create a more structured prompt for OpenAI to ensure proper JSON response
    const prompt = `
      You are a social media caption expert. Create a ${style} caption for a ${platform} post about "${keywords}" with a ${mood} mood.
      
      The caption should be engaging, authentic, and optimized for high engagement.
      
      Also generate 5-8 relevant hashtags that would help this post get discovered.
      
      Return ONLY a JSON object with the following format (no explanation or other text):
      {
        "caption": "Your generated caption here",
        "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", ...]
      }
    `

    // Generate the caption using OpenAI with system message to enforce JSON
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      system:
        "You are a helpful assistant that always responds with valid JSON objects as specified in the user's request. Never include explanations or additional text outside the JSON structure.",
    })

    console.log("Raw OpenAI response:", text)

    // Parse the response with error handling
    let parsedResponse
    try {
      // Clean the response to handle potential formatting issues
      const cleanedText = text.trim()
      parsedResponse = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error("JSON parsing error:", parseError)
      console.log("Failed to parse text:", text)

      // Attempt to extract JSON if the response contains additional text
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        try {
          parsedResponse = JSON.parse(jsonMatch[0])
        } catch (secondParseError) {
          console.error("Second JSON parsing attempt failed:", secondParseError)
          throw new Error("Invalid response format from OpenAI")
        }
      } else {
        throw new Error("Could not extract JSON from response")
      }
    }

    // Validate the parsed response has the expected structure
    if (!parsedResponse.caption || !Array.isArray(parsedResponse.hashtags)) {
      console.error("Invalid response structure:", parsedResponse)
      throw new Error("Response missing required fields")
    }

    return NextResponse.json({
      caption: parsedResponse.caption,
      hashtags: parsedResponse.hashtags,
    })
  } catch (error) {
    console.error("Error generating caption:", error)

    // Return a more detailed error message
    return NextResponse.json(
      {
        error: "Failed to generate caption",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

