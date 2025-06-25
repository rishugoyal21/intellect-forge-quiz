
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/FileUpload";
import { QuizInterface } from "@/components/QuizInterface";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { ContentGenerator } from "@/components/ContentGenerator";
import { Brain, FileText, Target, TrendingUp, Upload, Zap } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [quizData, setQuizData] = useState(null);

  const handleContentGenerated = (content: any) => {
    setGeneratedContent(content);
    if (content.type === "quiz") {
      setQuizData(content);
      setActiveTab("quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <Brain className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              AI-Powered Learning Generator
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Transform your code, documents, and technical content into interactive quizzes and comprehensive summaries using advanced AI
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Zap className="h-4 w-4 mr-2" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Target className="h-4 w-4 mr-2" />
                Multiple Difficulty Levels
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <TrendingUp className="h-4 w-4 mr-2" />
                Progress Tracking
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="generate" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Your Content
                </CardTitle>
                <CardDescription>
                  Upload code snippets, documentation, or technical content to generate quizzes and summaries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onUploadComplete={() => setActiveTab("generate")} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-6">
            <ContentGenerator onContentGenerated={handleContentGenerated} />
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            {quizData ? (
              <QuizInterface quizData={quizData} />
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Quiz Available</h3>
                  <p className="text-muted-foreground mb-4">Generate a quiz first by uploading content and selecting quiz generation.</p>
                  <Button onClick={() => setActiveTab("upload")}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <ProgressDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
