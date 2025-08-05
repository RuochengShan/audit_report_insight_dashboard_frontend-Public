
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UploadCloud, Loader2, AlertTriangle } from 'lucide-react';
import { mockProjects, type Project, type ReportItemType } from '@/lib/mock-data';
import { processAuditReportAction } from '@/app/actions';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface LoadDataTabProps {
  onDataLoaded: (data: ReportItemType[]) => void;
}

const LoadDataTab: React.FC<LoadDataTabProps> = ({ onDataLoaded }) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedProject, setSelectedProject] = React.useState<string>('');
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const result = await processAuditReportAction(formData);
      toast({
        title: "Upload Successful",
        description: `Report "${selectedFile.name}" has been processed.`,
      });
      onDataLoaded(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during processing.';
      setError(errorMessage);
       toast({
        variant: "destructive",
        title: "Upload Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProjects = mockProjects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <UploadCloud className="mr-2 h-6 w-6 text-primary" />
            Upload Audit Report
          </CardTitle>
          <CardDescription>
            Upload your audit report in PDF format to begin analysis. The system will process the document to create an interactive report.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pdf-upload">PDF File</Label>
            <Input id="pdf-upload" type="file" accept=".pdf" onChange={handleFileChange} className="file:text-primary file:font-semibold" disabled={isLoading} />
          </div>
           {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleUpload} disabled={!selectedFile || isLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
               <>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload and Process PDF
               </>
            )}
          </Button>
          {selectedFile && <p className="text-sm text-muted-foreground">Selected file: {selectedFile.name}</p>}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Search className="mr-2 h-6 w-6 text-primary" />
            Select Audit Project
          </CardTitle>
          <CardDescription>
            Choose an ongoing audit project from the list below. You can also search for projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="project-search">Search Projects</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="project-search"
                type="text"
                placeholder="Search by project name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="project-select">Select Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger id="project-select" className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project: Project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-4 text-sm text-muted-foreground text-center">No projects found.</div>
                )}
              </SelectContent>
            </Select>
          </div>
          {selectedProject && (
            <p className="text-sm text-muted-foreground">
              Selected project: {mockProjects.find(p => p.id === selectedProject)?.name}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadDataTab;
