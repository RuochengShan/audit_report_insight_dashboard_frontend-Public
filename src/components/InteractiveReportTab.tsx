
'use client';

import * as React from 'react';
import { type ReportItemType } from '@/lib/mock-data';
import ReportDisplay from './ReportDisplay';
import ReportSidePanel from './ReportSidePanel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

interface InteractiveReportTabProps {
  reportData: ReportItemType[];
}

const InteractiveReportTab: React.FC<InteractiveReportTabProps> = ({ reportData }) => {
  const [selectedItem, setSelectedItem] = React.useState<ReportItemType | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = React.useState(false);

  const handleItemSelect = (item: ReportItemType) => {
    setSelectedItem(item);
    setIsSidePanelOpen(true);
  };
  
  React.useEffect(() => {
    // When new data is loaded, automatically select the first item.
    if (reportData && reportData.length > 0) {
      setSelectedItem(reportData[0]);
    } else {
        setSelectedItem(null);
    }
  }, [reportData]);


  if (!reportData || reportData.length === 0) {
    return (
        <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle className="font-headline">No Report Data</AlertTitle>
            <AlertDescription>
            Please upload a report in the &quot;Load Data&quot; tab to get started.
            </AlertDescription>
        </Alert>
    );
  }


  return (
    <div className="flex flex-col h-[calc(100vh-200px)] md:h-[calc(100vh-180px)]"> {/* Adjust height as needed */}
      <Card className="shadow-lg flex-grow flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <LayoutDashboard className="mr-2 h-6 w-6 text-primary" />
            Interactive Audit Report
          </CardTitle>
          <CardDescription>
            Navigate through the report chapters and sections. Click on an item to view details and insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-0">
          <ScrollArea className="h-full p-4 md:p-6">
            <ReportDisplay
              reportData={reportData}
              onItemSelect={handleItemSelect}
              selectedItemId={selectedItem?.id || null}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      <ReportSidePanel
        isOpen={isSidePanelOpen}
        onOpenChange={setIsSidePanelOpen}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default InteractiveReportTab;
