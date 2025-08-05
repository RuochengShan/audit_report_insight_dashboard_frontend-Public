// src/app/actions.ts
'use server';
import type { GenerateAuditInsightsInput, GenerateAuditInsightsOutput } from '@/ai/flows/generate-audit-insights';
import { mockReportData, type ReportItemType } from '@/lib/mock-data';

export async function getAiInsightsAction(input: GenerateAuditInsightsInput): Promise<GenerateAuditInsightsOutput> {
  // Mock implementation
  console.log('Mock getAiInsightsAction called with input:', input);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        insights: "This is a mock insight generated for the topic: '" + input.topic + "'. The actual AI call has been bypassed for testing purposes. This placeholder text confirms that the UI is correctly wired to the action.",
      });
    }, 500); // Simulate network delay
  });

  // Original implementation:
  // try { // The GenAI flow likely has its own error handling. If not, add more robust error handling here.
  //   const result = await generateAuditInsights(input);
  //   return result;
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


export async function processAuditReportAction(formData: FormData): Promise<ReportItemType[]> {
    const file = formData.get('file') as File;
    console.log('Processing file on server:', file.name);

    const apiUrl = process.env.AUDIT_REPORT_API_URL;
    if (!apiUrl) {
        throw new Error("API URL is not configured. Please set AUDIT_REPORT_API_URL in your environment variables.");
    }
    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            // Try to parse error message from the API, otherwise use a generic one
            let errorMessage = `API Error: ${response.status} ${response.statusText}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.detail || errorMessage;
            } catch (e) {
                // Ignore if the response body is not JSON
            }
            throw new Error(errorMessage);
        }

        const data: ReportItemType[] = await response.json();
        return data;

    } catch (error) {
        console.error("Error processing audit report:", error);
        if (error instanceof Error) {
            // Prepend a more user-friendly message to network or API errors
            throw new Error(`Failed to connect to the processing service: ${error.message}`);
        }
        throw new Error("An unknown error occurred while processing the audit report.");
    }
}
