
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
            "Formatting Adjustments: In the revised version, there is a slight formatting change in the numbering of \"Administrative payments\" and \"Corporate procurement/Administrative contracts management.\" The superscript \"2\" is moved to follow the period instead of preceding it. This is a minor typographical adjustment.",
          ],
          deletions: [
            "Footnote Reference: The original version includes a footnote reference \"2\" after \"Administrative payments\" and \"Corporate procurement/Administrative contracts management,\" which suggests there might have been additional information or clarification provided in a footnote. The revised version maintains the superscript but does not provide any footnote content, indicating that any associated footnote content has been removed.",
          ],
          additions: [
            "No New Information: There is no new information added in the revised version. The content remains consistent with the original version, aside from the minor formatting change mentioned above",
          ],
        },
        {
          chapter: "Background",
          changes: [
            "Rewording: The term \\”RPA\\” in the original version was changed to \\”RPA Specialist\\” in the revised version. This change provides a more specific title for the role, potentially clarifying the responsibilities or expertise of the position.",
          ],
          deletions: [
            "Vendor Invoice Submission: The original version included a paragraph about Haitian vendors submitting invoices via email rather than using the designated vendor portal. This paragraph highlighted the extra step added to the administrative payment process, involving manual entry into SAP by the COF’s front office operator. This information was completely removed in the revised version.",
          ],
          additions: [
            "No New Information",
          ],
        },
        {
          chapter: "Observations and Management Action Plans",
          changes: [
            "Clarification and Rewording: The phrase \\”COF Vehicles fleet was not adequately maintained\\” was changed to \\”COF Vehicles fleet inventory was not adequately maintained\\” to specify the issue with inventory rather than maintenance.",
            "Clarification and Rewording: The risk associated with petty cash management was rephrased from \\”Unauthorized, and/or incorrect monetary outflows\\” to \\”Unauthorized, and/or incorrect use of the petty cash could result in monetary resources being used for non-intended purposes,\\” providing a clearer explanation of the potential consequences.",
            "Additional Details: In Observation 1, a new detail was added regarding the practice of Haitian vendors submitting invoices via email, which adds an extra step to the administrative payment process.",
            "Additional Details: In Observation 5, the risk was expanded to include potential security issues and negative impacts on the Bank's reputation."
          ],
          deletions: [
            "Specific Details Removed: The original version included a detailed explanation of the AUG's review of administrative payment transactions timeframes, mentioning the involvement of AUG's review and the positive effect of Centric and VPC/CID front office. The revised version simplifies this to \\”Administrative payment transactions timeframes validated the positive effect obtained by involving the CID's front office and Centric hub.\\”",
            "The original version included a detailed explanation of the discrepancies in vehicle sales documentation, mentioning emails from the RPA. The revised version simplifies this to \\”it was poorly supported with emails from the RPA.\\”"
          ],
          additions: [
            "Additional Practices and Risks: In Observation 1, the revised version adds a note about the practice of Haitian vendors submitting invoices via email, which adds an extra step to the administrative payment process.",
            "EAdditional Practices and Risks: In Observation 5, the risk associated with non-compliance with the OAS passports regulation was expanded to include potential security issues and negative impacts on the Bank's reputation",
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <Card className="shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Similarity Scores</CardTitle>
                <CardDescription>Comparison of similarity metrics between the two documents.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <SimilarityChart data={chartData} />
              </CardContent>
            </Card>
            <AiChatInterface />
          </div>
          <AnalysisReport results={analysisReport} />
        </div>
      )}
    </div>
  );
}
