
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud, FileSearch2, Loader2, AlertTriangle } from 'lucide-react';
import { SimilarityChart } from '@/components/SimilarityChart';
import { AnalysisReport, type AnalysisResult } from '@/components/AnalysisReport';
import { AiChatInterface } from '@/components/AiChatInterface';
import { analyzeSimilarityAction, type SimilarityAnalysisResponse } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SimilarityAnalysisPage() {
  const [clientFile, setClientFile] = React.useState<File | null>(null);
  const [qaFile, setQaFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [analysisData, setAnalysisData] = React.useState<SimilarityAnalysisResponse | null>(null);
  const { toast } = useToast();

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

  const handleAnalyze = async () => {
    if (clientFile && qaFile) {
      setIsLoading(true);
      setError(null);
      setAnalysisData(null);

      const formData = new FormData();
      formData.append('clientFile', clientFile);
      formData.append('qaFile', qaFile);

      try {
        const result = await analyzeSimilarityAction(formData);
        setAnalysisData(result);
        toast({
          title: "Analysis Complete",
          description: "Similarity scores and detailed report have been generated.",
        });
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
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
              <Label htmlFor="client-doc-upload">Word Document</Label>
              <Input id="client-doc-upload" type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleClientFileChange} className="file:text-primary file:font-semibold"/>
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
              <Label htmlFor="qa-doc-upload">Word Document</Label>
              <Input id="qa-doc-upload" type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleQaFileChange} className="file:text-primary file:font-semibold"/>
            </div>
            {qaFile && <p className="text-sm text-muted-foreground">Selected file: {qaFile.name}</p>}
          </CardContent>
        </Card>
      </div>
       {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex justify-center">
        <Button onClick={handleAnalyze} disabled={!clientFile || !qaFile || isLoading} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileSearch2 className="mr-2 h-5 w-5" />
                Analyze for Similarity
              </>
            )}
        </Button>
      </div>

      {analysisData && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <Card className="shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Similarity Scores</CardTitle>
                <CardDescription>Comparison of similarity metrics between the two documents.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <SimilarityChart data={analysisData.chartData} />
              </CardContent>
            </Card>
            <AiChatInterface 
              clientFileContent={analysisData.clientFileContent}
              qaFileContent={analysisData.qaFileContent}
            />
          </div>
          <AnalysisReport results={analysisData.analysisReport} />
        </div>
      )}
    </div>
  );
}
