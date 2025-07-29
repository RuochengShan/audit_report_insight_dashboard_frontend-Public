import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Laptop, FileText, Activity, Search } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Audit Report Insight Dashboard',
  description: 'Audit Report Insight Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2">
                 <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
                    <Home className="h-6 w-6" />
                 </div>
                 <h1 className="font-headline text-lg font-semibold">Audit Hub</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Planning">
                        <Link href="/planning">
                            <Laptop />
                            Planning
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Fieldwork">
                        <Link href="/fieldwork">
                            <Search />
                            Fieldwork
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Reporting">
                        <Link href="/reporting">
                            <FileText />
                            Reporting
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Monitoring">
                        <Link href="/monitoring">
                            <Activity />
                            Monitoring
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
             <header className="p-4 border-b flex items-center gap-4">
                <SidebarTrigger />
                <h2 className="font-headline text-2xl font-semibold">Dashboard</h2>
            </header>
            <main className="p-4 md:p-6">
                {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
