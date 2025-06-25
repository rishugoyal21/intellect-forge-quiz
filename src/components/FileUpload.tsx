
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Upload, File, X, Github, Link } from "lucide-react";

interface FileUploadProps {
  onUploadComplete: () => void;
}

export const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const validTypes = ['.js', '.py', '.java', '.cpp', '.md', '.txt', '.pdf'];
      return validTypes.some(type => file.name.toLowerCase().endsWith(type));
    });

    if (validFiles.length !== droppedFiles.length) {
      toast({
        title: "Invalid files detected",
        description: "Some files were skipped. Please upload code files, markdown, or text documents.",
        variant: "destructive",
      });
    }

    setFiles(prev => [...prev, ...validFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0 && !githubUrl) {
      toast({
        title: "No content selected",
        description: "Please upload files or provide a GitHub URL.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Content uploaded successfully!",
      description: `${files.length} files uploaded. Ready for processing.`,
    });

    // Store uploaded content in localStorage for demo purposes
    localStorage.setItem('uploadedFiles', JSON.stringify(files.map(f => ({ name: f.name, size: f.size, type: f.type }))));
    localStorage.setItem('githubUrl', githubUrl);

    onUploadComplete();
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <Card
        className={`border-2 border-dashed transition-all duration-200 ${
          dragActive 
            ? "border-blue-500 bg-blue-50" 
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
          <p className="text-muted-foreground mb-4">
            Supports: JavaScript, Python, Java, C++, Markdown, Text, PDF
          </p>
          <Input
            type="file"
            multiple
            accept=".js,.py,.java,.cpp,.md,.txt,.pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button asChild variant="outline">
            <Label htmlFor="file-upload" className="cursor-pointer">
              Select Files
            </Label>
          </Button>
        </CardContent>
      </Card>

      {/* GitHub URL Input */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Github className="h-5 w-5" />
            <h3 className="font-medium">Or import from GitHub</h3>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="https://github.com/username/repository"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" size="icon">
              <Link className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-4">Uploaded Files ({files.length})</h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {file.name.split('.').pop()?.toUpperCase()}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit} 
        className="w-full h-12 text-lg"
        disabled={files.length === 0 && !githubUrl}
      >
        Continue to Generation
      </Button>
    </div>
  );
};
