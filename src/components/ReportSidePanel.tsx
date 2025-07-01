'use client';

import * as React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { ReportItemType } from '@/lib/mock-data';
import AiInsightGenerator from '@/components/AiInsightGenerator';
import { Badge } from '@/components/ui/badge';
import { ListChecks, Paperclip, FileText, X } from 'lucide-react';
import { AcronymsTable } from './AcronymsTable';
import { DistributionList } from './DistributionList';

interface ReportSidePanelProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  selectedItem: ReportItemType | null;
}

const ReportSidePanel: React.FC<ReportSidePanelProps> = ({ isOpen, onOpenChange, selectedItem }) => {
  if (!selectedItem) {
    return null;
  }

  const hasCompleteness = typeof selectedItem.completeness === 'number';

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg p-0 flex flex-col" aria-labelledby="side-panel-title">
        <SheetHeader className="p-6 pb-2 border-b">
          <div className="flex justify-between items-start">
            <div>
              <SheetTitle id="side-panel-title" className="font-headline text-2xl text-primary">{selectedItem.title}</SheetTitle>
              <SheetDescription>
                Details and insights for the selected report {selectedItem.type}.
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="ml-auto shrink-0">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
          {hasCompleteness && (
            <Badge variant={selectedItem.completeness! > 85 ? "default" : selectedItem.completeness! > 40 ? "secondary" : "destructive"} className="mt-2 w-fit">
              Completeness: {selectedItem.completeness}%
            </Badge>
          )}
        </SheetHeader>

        <ScrollArea className="flex-grow p-6">
          {selectedItem.specialDisplay === 'acronyms' ? (
            <AcronymsTable />
          ) : selectedItem.specialDisplay === 'distributionList' ? (
            <DistributionList to={selectedItem.distributionTo || []} cc={selectedItem.distributionCc || []} />
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold font-headline text-lg mb-2 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Summary
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-md">
                  {selectedItem.contentSummary}
                </p>
              </div>

              {selectedItem.missingTopics && selectedItem.missingTopics.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold font-headline text-lg mb-2 flex items-center">
                      <ListChecks className="mr-2 h-5 w-5 text-destructive" />
                      What's Still Missing?
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground pl-2">
                      {selectedItem.missingTopics.map((topic, index) => (
                        <li key={index} className="py-1">{topic}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {hasCompleteness && (
                <>
                  <Separator />
                  <AiInsightGenerator auditReportSectionContent={selectedItem.contentSummary} />
                </>
              )}


              {selectedItem.relevantDocuments && selectedItem.relevantDocuments.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold font-headline text-lg mb-2 flex items-center">
                      <Paperclip className="mr-2 h-5 w-5 text-primary" />
                      Relevant Documents & Evidence
                    </h3>
                    <ul className="space-y-1 text-sm text-foreground">
                      {selectedItem.relevantDocuments.map((doc, index) => (
                        <li key={index} className="flex items-center py-1">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground flex-shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
        </ScrollArea>
        <div className="p-6 border-t">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">Close Panel</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReportSidePanel;
