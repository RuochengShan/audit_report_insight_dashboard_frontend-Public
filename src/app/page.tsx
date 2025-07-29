import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Search, FileText, Activity } from "lucide-react";
import Link from 'next/link';

const functions = [
  {
    title: 'Planning',
    icon: ClipboardList,
    href: '#',
    description: 'Define audit scope, objectives, and resources.'
  },
  {
    title: 'Fieldwork',
    icon: Search,
    href: '/fieldwork/insight',
    description: 'Execute tests, gather evidence, and analyze data.'
  },
  {
    title: 'Reporting',
    icon: FileText,
    href: '#',
    description: 'Communicate findings and recommendations.'
  },
  {
    title: 'Monitoring',
    icon: Activity,
    href: '#',
    description: 'Track implementation of action plans.'
  }
];

export default function Home() {
  return (
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
  );
}
