
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileDiff, Trash2, PlusCircle, Pencil } from 'lucide-react';

export interface AnalysisResult {
  chapter: string;
  changes: string[];
  deletions: string[];
  additions: string[];
}

interface AnalysisReportProps {
  results: AnalysisResult[];
}

interface AnalysisDetailCardProps {
  title: string;
  points: string[];
  icon: React.ElementType;
  iconColorClass: string;
}

const AnalysisDetailCard: React.FC<AnalysisDetailCardProps> = ({ title, points, icon: Icon, iconColorClass }) => {
  if (points.length === 0) return null;
  return (
    <Card className="mb-4 bg-muted/20">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-md font-headline flex items-center">
          <Icon className={`mr-2 h-5 w-5 ${iconColorClass}`} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          {points.map((point, index) => <li key={index}>{point}</li>)}
        </ul>
      </CardContent>
    </Card>
  );
};


export const AnalysisReport: React.FC<AnalysisReportProps> = ({ results }) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
            <FileDiff className="mr-2 h-6 w-6 text-primary"/>
            Detailed Analysis Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {results.map((result, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="font-headline text-lg hover:no-underline">{result.chapter}</AccordionTrigger>
              <AccordionContent className="p-2">
                <AnalysisDetailCard 
                  title="Changes Made as a result of QA Review"
                  points={result.changes} 
                  icon={Pencil}
                  iconColorClass="text-blue-500"
                />
                <AnalysisDetailCard 
                  title="Deleted Information as a result of QA Review"
                  points={result.deletions} 
                  icon={Trash2}
                  iconColorClass="text-red-500"
                />
                <AnalysisDetailCard 
                  title="New Added Information as a result of QA Review"
                  points={result.additions} 
                  icon={PlusCircle}
                  iconColorClass="text-green-500"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
