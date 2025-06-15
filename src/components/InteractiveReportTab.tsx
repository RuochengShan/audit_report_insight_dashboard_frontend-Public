'use client';

import * as React from 'react';
import { mockReportData, type ReportItemType } from '@/lib/mock-data';
import ReportDisplay from './ReportDisplay';
import ReportSidePanel from './ReportSidePanel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard } from 'lucide-react';

const InteractiveReportTab: React.FC = () => {
  const [reportData] = React.useState<ReportItemType[]>(mockReportData);
  const [selectedItem, setSelectedItem] = React.useState<ReportItemType | null>(null);
  const [isSidePanelOpen, setIsSidePanelOpen] = React.useState(false);

  const handleItemSelect = (item: ReportItemType) => {
    setSelectedItem(item);
    setIsSidePanelOpen(true);
  };

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
