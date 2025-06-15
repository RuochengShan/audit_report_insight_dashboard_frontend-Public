'use client';

import * as React from 'react';
import type { ReportItemType } from '@/lib/mock-data';
import ReportItem from './ReportItem';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';

interface ReportDisplayProps {
  reportData: ReportItemType[];
  onItemSelect: (item: ReportItemType) => void;
  selectedItemId: string | null;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ reportData, onItemSelect, selectedItemId }) => {
  if (!reportData || reportData.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle className="font-headline">No Report Data</AlertTitle>
        <AlertDescription>
          The audit report data is not available or hasn't been loaded yet. Please upload a report in the "Load Data" tab.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4 pr-2"> {/* Added pr-2 for scrollbar spacing if needed */}
      {reportData.map(item => (
        <ReportItem
          key={item.id}
          item={item}
          onItemClick={onItemSelect}
          selectedItemId={selectedItemId}
        />
      ))}
    </div>
  );
};

export default ReportDisplay;
