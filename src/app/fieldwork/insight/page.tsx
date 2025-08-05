
'use client';

import * as React from 'react';
import LoadDataTab from '@/components/LoadDataTab';
import InteractiveReportTab from '@/components/InteractiveReportTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, BarChart2 } from 'lucide-react';
import type { ReportItemType } from '@/lib/mock-data';

export default function FieldworkInsightPage() {
  const [reportData, setReportData] = React.useState<ReportItemType[] | null>(null);
  const [activeTab, setActiveTab] = React.useState('load-data');

  const handleDataLoaded = (data: ReportItemType[]) => {
    setReportData(data);
    setActiveTab('interactive-report');
  };

  return (
    <div className="w-full">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary tracking-tight mb-6">
            Audit Report Insight Dashboard
        </h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="load-data" className="py-3 text-sm md:text-base font-medium">
              <Upload className="mr-2 h-5 w-5" /> Load Data
            </TabsTrigger>
            <TabsTrigger value="interactive-report" disabled={!reportData} className="py-3 text-sm md:text-base font-medium">
              <BarChart2 className="mr-2 h-5 w-5" /> Interactive Report
            </TabsTrigger>
          </TabsList>
          <TabsContent value="load-data">
            <LoadDataTab onDataLoaded={handleDataLoaded} />
          </TabsContent>
          <TabsContent value="interactive-report">
            {reportData ? (
              <InteractiveReportTab reportData={reportData} />
            ) : (
              <div className="text-center text-muted-foreground p-8">
                <p>Please load an audit report in the "Load Data" tab to view the interactive report.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
    </div>
  );
}
