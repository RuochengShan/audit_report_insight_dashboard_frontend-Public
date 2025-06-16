'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ReportItemType } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react';

interface ReportItemProps {
  item: ReportItemType;
  onItemClick: (item: ReportItemType) => void;
  selectedItemId: string | null;
  level?: number;
}

const ReportItem: React.FC<ReportItemProps> = ({ item, onItemClick, selectedItemId, level = 0 }) => {
  const [isExpanded, setIsExpanded] = React.useState(level < 1); // Expand chapters by default

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking expand icon
    setIsExpanded(!isExpanded);
  };

  const hasSubItems = item.subItems && item.subItems.length > 0;
  const IconComponent = item.type === 'chapter' ? Folder : FileText;

  let progressBarColorClass = '';
  if (item.completeness < 40) {
    progressBarColorClass = 'bg-red-500';
  } else if (item.completeness <= 90) {
    progressBarColorClass = 'bg-yellow-500';
  } else {
    progressBarColorClass = 'bg-green-500';
  }

  return (
    <div style={{ marginLeft: `${level * 20}px` }} className="mb-2">
      <Card
        className={cn(
          "cursor-pointer transition-all duration-200 ease-in-out hover:shadow-xl hover:border-accent focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          selectedItemId === item.id ? "border-primary shadow-lg ring-2 ring-primary ring-offset-1" : "border-border"
        )}
        onClick={() => onItemClick(item)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onItemClick(item); }}
        tabIndex={0}
        aria-selected={selectedItemId === item.id}
        aria-expanded={hasSubItems ? isExpanded : undefined}
      >
        <CardHeader className="py-3 px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {hasSubItems && (
                <button
                  onClick={handleToggleExpand}
                  aria-label={isExpanded ? "Collapse section" : "Expand section"}
                  className="mr-2 p-1 rounded-full hover:bg-muted focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </button>
              )}
              <IconComponent className={cn("h-5 w-5 mr-2", item.type === 'chapter' ? 'text-primary' : 'text-secondary-foreground')} />
              <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
            </div>
            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              {item.completeness}% complete
            </span>
          </div>
        </CardHeader>
        { (isExpanded || level === 0) && ( // Show content for expanded items or top-level items
          <CardContent className="px-4 pb-3 pt-0">
            <p className={cn("text-sm text-muted-foreground truncate", !hasSubItems && "mb-2")}>{item.contentSummary}</p>
            <Progress
              value={item.completeness}
              aria-label={`Completeness: ${item.completeness}%`}
              className="h-2 mt-1"
              indicatorClassName={progressBarColorClass}
            />
          </CardContent>
        )}
      </Card>

      {hasSubItems && isExpanded && (
        <div className="mt-2 pl-4 border-l-2 border-muted">
          {item.subItems?.map(subItem => (
            <ReportItem
              key={subItem.id}
              item={subItem}
              onItemClick={onItemClick}
              selectedItemId={selectedItemId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportItem;
