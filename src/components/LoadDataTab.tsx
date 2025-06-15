'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UploadCloud } from 'lucide-react';
import { mockProjects, type Project } from '@/lib/mock-data';

const LoadDataTab: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedProject, setSelectedProject] = React.useState<string>('');
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // In a real app, you would handle the file upload here
      console.log('Uploading file:', selectedFile.name);
      // alert(`File "${selectedFile.name}" selected for upload.`);
    } else {
      // alert('Please select a file to upload.');
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
            Upload your audit report in PDF format to begin analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pdf-upload">PDF File</Label>
            <Input id="pdf-upload" type="file" accept=".pdf" onChange={handleFileChange} className="file:text-primary file:font-semibold"/>
          </div>
          <Button onClick={handleUpload} disabled={!selectedFile} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload PDF
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
