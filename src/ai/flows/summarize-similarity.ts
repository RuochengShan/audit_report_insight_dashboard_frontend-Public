'use server';

/**
 * @fileOverview Generates a summary or answers questions based on two document versions.
 *
 * - summarizeSimilarity - A function that handles the summarization or question answering.
 * - SummarizeSimilarityInput - The input type for the summarizeSimilarity function.
 * - SummarizeSimilarityOutput - The return type for the summarizeSimilarity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSimilarityInputSchema = z.object({
  clientVersionContent: z.string().describe('The full text content of the document version sent to the client.'),
  qaVersionContent: z.string().describe('The full text content of the document version sent for QA review.'),
  query: z.string().describe('The user\'s question or request for summarization.'),
});
export type SummarizeSimilarityInput = z.infer<typeof SummarizeSimilarityInputSchema>;

const SummarizeSimilarityOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer or summary based on the documents and the user query.'),
});
export type SummarizeSimilarityOutput = z.infer<typeof SummarizeSimilarityOutputSchema>;


export async function summarizeSimilarity(input: SummarizeSimilarityInput): Promise<SummarizeSimilarityOutput> {
    return summarizeSimilarityFlow(input);
}

const prompt = ai.definePrompt({
    name: 'summarizeSimilarityPrompt',
    input: {schema: SummarizeSimilarityInputSchema},
    output: {schema: SummarizeSimilarityOutputSchema},
    prompt: `You are an expert AI assistant specialized in comparing and analyzing audit reports. You will be given two versions of a document: one sent to the client and one sent for QA review.

Your task is to answer the user's query based on the content of these two documents. Provide a clear, concise, and accurate response.

User Query: {{{query}}}

Client Version Content:
---
{{{clientVersionContent}}}
---

QA Version Content:
---
{{{qaVersionContent}}}
---

Answer:`,
});

const summarizeSimilarityFlow = ai.defineFlow(
  {
    name: 'summarizeSimilarityFlow',
    inputSchema: SummarizeSimilarityInputSchema,
    outputSchema: SummarizeSimilarityOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
