// src/app/actions.ts
'use server';
import { generateAuditInsights, type GenerateAuditInsightsInput, type GenerateAuditInsightsOutput } from '@/ai/flows/generate-audit-insights';

export async function getAiInsightsAction(input: GenerateAuditInsightsInput): Promise<GenerateAuditInsightsOutput> {
  // try { // The GenAI flow likely has its own error handling. If not, add more robust error handling here.
    const result = await generateAuditInsights(input);
    return result;
  // } catch (error) {
  //   console.error("Error generating AI insights:", error);
  //   // Return a structured error or throw a more specific error
  //   // For now, rethrowing to be caught by the client-side component.
  //   if (error instanceof Error) {
  //     throw new Error(`Failed to generate AI insights: ${error.message}`);
  //   }
  //   throw new Error("An unknown error occurred while generating AI insights.");
  // }
}
