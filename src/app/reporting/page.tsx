import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch2 } from "lucide-react";
import Link from "next/link";

const functions = [
  {
    title: 'Similarity Analysis',
    icon: FileSearch2,
    href: '/reporting/similarity-analysis',
    description: 'Analyze and compare audit reports to identify similarities and trends.'
  }
];

export default function ReportingPage() {
  return (
    <div>
      <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary tracking-tight mb-6">
        Reporting Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {functions.map((func) => (
           <Link href={func.href} key={func.title} className="block hover:shadow-xl transition-shadow rounded-lg">
            <Card className="h-full flex flex-col justify-between">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-headline font-bold text-primary">{func.title}</CardTitle>
                <func.icon className="h-8 w-8 text-accent" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{func.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
