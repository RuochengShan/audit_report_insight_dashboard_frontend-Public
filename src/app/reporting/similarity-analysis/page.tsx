
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, FileSearch2 } from 'lucide-react';
import { SimilarityChart } from '@/components/SimilarityChart';
import { AnalysisReport, type AnalysisResult } from '@/components/AnalysisReport';
import { AiChatInterface } from '@/components/AiChatInterface';

export default function SimilarityAnalysisPage() {
  const [clientFile, setClientFile] = React.useState<File | null>(null);
  const [qaFile, setQaFile] = React.useState<File | null>(null);
  const [isAnalyzed, setIsAnalyzed] = React.useState(false);
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [analysisReport, setAnalysisReport] = React.useState<AnalysisResult[]>([]);

  const handleClientFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setClientFile(event.target.files[0]);
    }
  };

  const handleQaFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setQaFile(event.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    if (clientFile && qaFile) {
      // In a real app, you would handle the analysis here
      console.log('Analyzing files:', clientFile.name, qaFile.name);
      
      const mockChartData = [
        { name: 'Cosine Similarity', score: 92 },
        { name: 'Jaccard Index', score: 85 },
        { name: 'Levenshtein Distance', score: 78 },
        { name: 'Word Mover\'s Distance', score: 88 },
        { name: 'TF-IDF Similarity', score: 95 },
      ];
      
      const mockAnalysisReport: AnalysisResult[] = [
        {
          chapter: "Objective and Scope",
          changes: [
            "Objective 1 was rephrased for clarity, changing 'assess' to 'quantify'.",
            "Scope was narrowed to exclude mobile application endpoints, which will be covered in a separate review.",
          ],
          deletions: [
            "Reference to 'COBIT framework' was removed from the objectives section.",
          ],
          additions: [
            "A new objective was added to assess compliance with the new internal Data Privacy Policy (Ref: POL-DP-2024).",
          ],
        },
        {
          chapter: "Background",
          changes: [
            "The 'Prior Audit Work' section was updated to reflect the closure of finding IA-2023-08-03.",
          ],
          deletions: [
            "A paragraph describing the history of the 'Orion' ERP system was removed for brevity.",
          ],
          additions: [
            "A new section 'Stakeholder Interviews' was added, summarizing discussions with key process owners.",
            "A process flow diagram was added as an appendix and referenced in the text.",
          ],
        },
        {
          chapter: "Observations and Management Action Plans",
          changes: [
            "Finding 2024-01 was downgraded from 'High Risk' to 'Medium Risk' based on new compensating controls identified.",
            "The target completion date for the MAP for finding 2024-02 was moved from Q3 to Q4 2024.",
          ],
          deletions: [
            "Commendation for 'Mature Change Management Process' was removed as it was deemed out of scope for the QA review.",
          ],
          additions: [
            "A new finding (2024-03) was added related to inadequate password complexity settings on a supporting server.",
            "Evidence screenshots were added for Finding 2024-01 to better illustrate the condition.",
          ],
        },
      ];

      setChartData(mockChartData);
      setAnalysisReport(mockAnalysisReport);
      setIsAnalyzed(true);

    } else {
      // alert('Please select both files to analyze.');
    }
  };

  return (
    <div className="space-y-8">
       <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary tracking-tight mb-6">
        Similarity Analysis
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <UploadCloud className="mr-2 h-6 w-6 text-primary" />
              Draft Sent to Client
            </CardTitle>
            <CardDescription>
              Upload the draft version of the report that was sent to the client.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="client-pdf-upload">PDF File</Label>
              <Input id="client-pdf-upload" type="file" accept=".pdf" onChange={handleClientFileChange} className="file:text-primary file:font-semibold"/>
            </div>
            {clientFile && <p className="text-sm text-muted-foreground">Selected file: {clientFile.name}</p>}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center">
              <UploadCloud className="mr-2 h-6 w-6 text-primary" />
              Draft Sent to QA
            </CardTitle>
            <CardDescription>
              Upload the draft version of the report that was sent for QA review.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="qa-pdf-upload">PDF File</Label>
              <Input id="qa-pdf-upload" type="file" accept=".pdf" onChange={handleQaFileChange} className="file:text-primary file:font-semibold"/>
            </div>
            {qaFile && <p className="text-sm text-muted-foreground">Selected file: {qaFile.name}</p>}
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleAnalyze} disabled={!clientFile || !qaFile} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <FileSearch2 className="mr-2 h-5 w-5" />
            Analyze for Similarity
        </Button>
      </div>

      {isAnalyzed && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Similarity Scores</CardTitle>
                <CardDescription>Comparison of similarity metrics between the two documents.</CardDescription>
              </CardHeader>
              <CardContent>
                <SimilarityChart data={chartData} />
              </CardContent>
            </Card>
            <AnalysisReport results={analysisReport} />
          </div>
          <AiChatInterface />
        </div>
      )}
    </div>
  );
}
