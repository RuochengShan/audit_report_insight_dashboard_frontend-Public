import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function MonitoringPage() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary tracking-tight mb-6">
        Monitoring Dashboard
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
            <Package className="h-16 w-16 mb-4" />
            <p>This section is under construction.</p>
            <p>Functions related to audit monitoring will be available here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
