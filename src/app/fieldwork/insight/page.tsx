import LoadDataTab from '@/components/LoadDataTab';
import InteractiveReportTab from '@/components/InteractiveReportTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, BarChart2 } from 'lucide-react';

export default function FieldworkInsightPage() {
  return (
    <div className="w-full">
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary tracking-tight mb-6">
            Audit Report Insight Dashboard
        </h1>
        <Tabs defaultValue="load-data" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="load-data" className="py-3 text-sm md:text-base font-medium">
              <Upload className="mr-2 h-5 w-5" /> Load Data
            </TabsTrigger>
            <TabsTrigger value="interactive-report" className="py-3 text-sm md:text-base font-medium">
              <BarChart2 className="mr-2 h-5 w-5" /> Interactive Report
            </TabsTrigger>
          </TabsList>
          <TabsContent value="load-data">
            <LoadDataTab />
          </TabsContent>
          <TabsContent value="interactive-report">
            <InteractiveReportTab />
          </TabsContent>
        </Tabs>
    </div>
  );
}
