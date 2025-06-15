'use server';

/**
 * @fileOverview Generates audit insights and feedback for a given topic within a selected audit report section.
 *
 * - generateAuditInsights - A function that generates audit insights based on a specific topic.
 * - GenerateAuditInsightsInput - The input type for the generateAuditInsights function.
 * - GenerateAuditInsightsOutput - The return type for the generateAuditInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAuditInsightsInputSchema = z.object({
  auditReportSection: z.string().describe('The content of the selected section of the audit report.'),
  topic: z.string().describe('The specific topic for which insights are requested.'),
});
export type GenerateAuditInsightsInput = z.infer<typeof GenerateAuditInsightsInputSchema>;

const GenerateAuditInsightsOutputSchema = z.object({
  insights: z.string().describe('Generated insights and feedback for the specified topic within the audit report section.'),
});
export type GenerateAuditInsightsOutput = z.infer<typeof GenerateAuditInsightsOutputSchema>;

export async function generateAuditInsights(input: GenerateAuditInsightsInput): Promise<GenerateAuditInsightsOutput> {
  return generateAuditInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAuditInsightsPrompt',
  input: {schema: GenerateAuditInsightsInputSchema},
  output: {schema: GenerateAuditInsightsOutputSchema},
  prompt: `You are an AI assistant specialized in providing insights and feedback on audit reports.

  Based on the content of the selected section and the specified topic, generate insights and feedback to improve the report's completeness and accuracy.

  Section Content: {{{auditReportSection}}}
  Topic: {{{topic}}}

  Insights and Feedback:`, // Provide clear instructions and context to the prompt
});

const generateAuditInsightsFlow = ai.defineFlow(
  {
    name: 'generateAuditInsightsFlow',
    inputSchema: GenerateAuditInsightsInputSchema,
    outputSchema: GenerateAuditInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
