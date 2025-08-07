
'use server';
import type { GenerateAuditInsightsInput, GenerateAuditInsightsOutput } from '@/ai/flows/generate-audit-insights';
import { generateAuditInsights } from '@/ai/flows/generate-audit-insights';
import { mockReportData, type ReportItemType } from '@/lib/mock-data';
import type { AnalysisResult } from '@/components/AnalysisReport';


export interface SimilarityAnalysisResponse {
  chartData: { name: string; score: number }[];
  analysisReport: AnalysisResult[];
  clientFileContent: string;
  qaFileContent: string;
}

export interface SummaryApiResponse {
  answer: string;
}

export async function getAiInsightsAction(input: GenerateAuditInsightsInput): Promise<GenerateAuditInsightsOutput> {
  try { 
    const result = await generateAuditInsights(input);
    return result;
  } catch (error) {
    console.error("Error generating AI insights:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate AI insights: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating AI insights.");
  }
}

export async function getSimilaritySummaryAction(clientVersionContent: string, qaVersionContent: string, query: string): Promise<SummaryApiResponse> {
  const apiUrl = process.env.SUMMARY_API_URL;
  if (!apiUrl) {
    console.error("SUMMARY_API_URL environment variable is not set.");
    throw new Error("Summary API URL is not configured.");
  }

  console.log(`Forwarding summary request to: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientVersionContent,
        qaVersionContent,
        query,
      }),
    });
    
    if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.detail || errorMessage;
        } catch (e) {
            // Ignore if the response body is not JSON and use the status text
        }
        console.error(`API responded with error: ${errorMessage}`);
        throw new Error(errorMessage);
    }
    
    const data: SummaryApiResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Error getting summary:", error);
     if (error instanceof Error && error.cause) {
       const nodeError = error.cause as NodeJS.ErrnoException;
       if (nodeError.code === 'ECONNREFUSED') {
         throw new Error(`Connection refused. Is the backend server running at ${apiUrl}?`);
       }
    }
    
    if (error instanceof Error) {
        throw new Error(`Failed to connect to the summary service: ${error.message}`);
    }
    throw new Error("An unknown error occurred while getting summary.");
  }
}


export async function processAuditReportAction(formData: FormData): Promise<ReportItemType[]> {
    const file = formData.get('file') as File;
    if (!file) {
        throw new Error("No file provided for processing.");
    }
    console.log('Processing file on server:', file.name);

    const apiUrl = process.env.AUDIT_REPORT_API_URL;
    if (!apiUrl) {
        console.error("AUDIT_REPORT_API_URL environment variable is not set.");
        throw new Error("API URL is not configured. Please set AUDIT_REPORT_API_URL in your environment variables.");
    }
    
    console.log(`Forwarding request to: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            let errorMessage = `API Error: ${response.status} ${response.statusText}`;
            try {
                const errorBody = await response.json();
                errorMessage = errorBody.detail || errorMessage;
            } catch (e) {
                // Ignore if the response body is not JSON and use the status text
            }
            console.error(`API responded with error: ${errorMessage}`);
            throw new Error(errorMessage);
        }

        const data: ReportItemType[] = await response.json();
        return data;

    } catch (error) {
        console.error("Error processing audit report:", error);
        if (error instanceof Error && error.cause) {
           const nodeError = error.cause as NodeJS.ErrnoException;
           if (nodeError.code === 'ECONNREFUSED') {
             throw new Error(`Connection refused. Is the backend server running at ${apiUrl}?`);
           }
        }
        
        if (error instanceof Error) {
            throw new Error(`Failed to connect to the processing service: ${error.message}`);
        }

        throw new Error("An unknown error occurred while processing the audit report.");
    }
}


export async function analyzeSimilarityAction(formData: FormData): Promise<SimilarityAnalysisResponse> {
  const clientFile = formData.get('clientFile') as File;
  const qaFile = formData.get('qaFile') as File;

  if (!clientFile || !qaFile) {
    throw new Error("Both files must be provided for analysis.");
  }
  
  const apiUrl = process.env.SIMILARITY_API_URL;
  if (!apiUrl) {
    console.error("SIMILARITY_API_URL environment variable is not set.");
    throw new Error("Similarity API URL is not configured.");
  }

  console.log(`Forwarding similarity analysis request to: ${apiUrl}`);

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.detail || errorMessage;
        } catch (e) {
            // Ignore if the response body is not JSON and use the status text
        }
        console.error(`API responded with error: ${errorMessage}`);
        throw new Error(errorMessage);
    }
    
    const data: SimilarityAnalysisResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Error analyzing similarity:", error);
    if (error instanceof Error && error.cause) {
       const nodeError = error.cause as NodeJS.ErrnoException;
       if (nodeError.code === 'ECONNREFUSED') {
         throw new Error(`Connection refused. Is the backend server running at ${apiUrl}?`);
       }
    }
    
    if (error instanceof Error) {
        throw new Error(`Failed to connect to the similarity analysis service: ${error.message}`);
    }

    throw new Error("An unknown error occurred while analyzing similarity.");
  }
}
