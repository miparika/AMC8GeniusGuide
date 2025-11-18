import { GoogleGenAI, Type } from "@google/genai";
import type { Problem, Solution, VerifiedProblem } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const problemSchema = {
    type: Type.OBJECT,
    properties: {
        problem: { type: Type.STRING, description: "The text of the math problem." },
        options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 5 multiple-choice options, e.g., ['(A) 1', ...]."
        },
        answer: { type: Type.STRING, description: "The letter of the correct option, e.g., 'C'." },
        topic: { type: Type.STRING, description: "The mathematical topic of the problem." },
        difficulty: { type: Type.STRING, description: "An assessment of the problem's difficulty, e.g., 'High Difficulty (Approx. #21-25)'." },
        problemImage: { type: Type.STRING, description: "An optional self-contained SVG string for geometry problems. Null if not applicable." },
        solution: { type: Type.STRING, description: "A detailed, step-by-step solution in Markdown format that proves the answer." },
        concepts: { type: Type.STRING, description: "The core mathematical concepts involved, in Markdown format." }
    },
    required: ['problem', 'options', 'answer', 'topic', 'difficulty', 'solution', 'concepts'],
};

export const getNewProblem = async (): Promise<VerifiedProblem> => {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
        attempts++;
        try {
            console.log(`Attempt ${attempts} to generate a self-verified problem...`);
            const generationPrompt = `Generate a challenging math problem suitable for a student aiming for a score of 23+ on the AMC 8 competition. The problem should be in the style of questions 21-25 on the AMC 8. 
            The topics should be one of: Combinatorics, Number Theory, Geometry, Algebra, Probability. 
            
            Your internal process MUST be as follows:
            1. Create a candidate problem, its 5 multiple-choice options, and identify the correct answer.
            2. Assess the problem's difficulty and create a label for it (e.g., "Medium Difficulty (Approx. #15-20)", "High Difficulty (Approx. #21-25)").
            3. If the problem is 'Geometry', you MUST generate a simple, clear, black-and-white, self-contained SVG image string. For other topics, this should be null.
            4. Write a detailed, step-by-step solution for the problem.
            5. CRITICALLY REVIEW your own solution. Does it logically and correctly lead to the answer you identified? Is the math sound?
            6. If your self-review fails, discard the problem and start again from step 1 with a new problem.
            7. Only when you have a problem that has passed your own internal verification, output the final, verified problem, difficulty, solution, and key concepts in the required JSON format.
            
            The final output JSON must contain 5 options, each starting with '(A)', '(B)', '(C)', '(D)', '(E)'. The answer should be just the letter, like 'C'.`;
            
            const genResponse = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: generationPrompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: problemSchema
                }
            });

            const fullProblemData = JSON.parse(genResponse.text.trim());

            console.log("Self-verification successful. Problem generated.");
            const { solution, concepts, ...problemData } = fullProblemData;
            return {
                problem: problemData as Problem,
                solution: { solution, concepts } as Solution,
            };

        } catch (error) {
            console.error(`An error occurred during attempt ${attempts}:`, error);
            if (attempts >= maxAttempts) {
                throw new Error("Failed to generate a new problem after multiple attempts.");
            }
        }
    }
    // This line should not be reachable, but is here as a fallback.
    throw new Error("Failed to generate and verify a new problem.");
};


export const getHints = async (problem: Problem): Promise<string[]> => {
    const prompt = `Given the following AMC 8 problem: "${problem.problem}".
    ${problem.problemImage ? `And its accompanying SVG diagram: \`\`\`xml\n${problem.problemImage}\n\`\`\`` : ''}
    Generate a sequence of 3 hints that guide a student to the solution without giving it away directly. The first hint should suggest a starting point. The second should guide them through a key step. The third should point towards the final calculation. Format the output as a JSON object with a 'hints' property, which is an array of strings.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    hints: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ['hints']
            }
        }
    });

    const text = response.text.trim();
    const parsed = JSON.parse(text);
    return parsed.hints;
};

// This function is now deprecated in favor of the pre-verified solution from getNewProblem, but kept for potential future use or separation of concerns.
export const getSolution = async (problem: Problem): Promise<Solution> => {
    const prompt = `For the AMC 8 problem: "${problem.problem}",
    ${problem.problemImage ? `And its accompanying SVG diagram: \`\`\`xml\n${problem.problemImage}\n\`\`\`` : ''}
    Provide a detailed, step-by-step solution using Markdown for formatting. After the solution, explain the core mathematical concepts involved. Format the output as a JSON object with 'solution' and 'concepts' properties, both being Markdown-formatted strings.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    solution: { type: Type.STRING },
                    concepts: { type: Type.STRING }
                },
                required: ['solution', 'concepts']
            }
        }
    });
    
    const text = response.text.trim();
    return JSON.parse(text) as Solution;
};