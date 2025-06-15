'use client';

import * as React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getAiInsightsAction } from '@/app/actions';
import type { GenerateAuditInsightsOutput } from '@/ai/flows/generate-audit-insights';
import { Lightbulb, Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


interface AiInsightGeneratorProps {
  auditReportSectionContent: string; // Content of the selected section
}

interface FormState {
  topic: string;
  result?: GenerateAuditInsightsOutput;
  error?: string;
  timestamp?: number; // To re-trigger effect on new submissions
}

const initialState: FormState = {
  topic: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Generate Insights
    </Button>
  );
}

const AiInsightGenerator: React.FC<AiInsightGeneratorProps> = ({ auditReportSectionContent }) => {
  const [topic, setTopic] = React.useState('');
  const [insights, setInsights] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!topic.trim()) {
      setError("Please enter a topic to get insights.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setInsights(null);

    try {
      const result = await getAiInsightsAction({
        auditReportSection: auditReportSectionContent,
        topic: topic,
      });
      setInsights(result.insights);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error Generating Insights",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Card className="bg-background/50">
      <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-accent" />
          Get Insights/Feedback
        </CardTitle>
        <CardDescription>
          Enter a topic related to this section to generate AI-powered insights and feedback.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="insight-topic" className="font-semibold">About topic (X)</Label>
            <Input
              id="insight-topic"
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., data security, access controls"
              className="mt-1"
              aria-describedby="topic-error"
            />
          </div>
          <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
            Generate Insights
          </Button>
        </form>

        {error && (
           <Alert variant="destructive" className="mt-4" id="topic-error">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {insights && (
          <div className="mt-6">
            <h4 className="font-semibold font-headline text-md mb-2">Generated Insights:</h4>
            <Textarea
              value={insights}
              readOnly
              rows={8}
              className="bg-muted/50 border-primary/30"
              aria-label="Generated AI insights"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AiInsightGenerator;
