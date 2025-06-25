
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/FileUpload";
import { QuizInterface } from "@/components/QuizInterface";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { ContentGenerator } from "@/components/ContentGenerator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Brain, FileText, Target, TrendingUp, Upload, Zap, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 transition-colors duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        
        {/* Theme Toggle in Header */}
        <div className="absolute top-6 right-6 z-10">
          <ThemeToggle />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 animate-bounce">
                <Brain className="h-16 w-16 text-white" />
                <div className="absolute -top-1 -right-1">
                  <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent animate-fade-in">
              AI-Powered Learning Generator
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto opacity-90">
              Transform your code, documents, and technical content into interactive quizzes and comprehensive summaries using advanced AI
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                <Zap className="h-4 w-4 mr-2 animate-pulse" />
                AI-Powered
              </Badge>
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                <Target className="h-4 w-4 mr-2" />
                Multiple Difficulty Levels
              </Badge>
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
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
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
            <TabsTrigger 
              value="upload" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger 
              value="generate" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <Brain className="h-4 w-4" />
              Generate
            </TabsTrigger>
            <TabsTrigger 
              value="quiz" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <FileText className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              <TrendingUp className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6 animate-fade-in">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Upload className="h-5 w-5 text-blue-500" />
                  Upload Your Content
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Upload code snippets, documentation, or technical content to generate quizzes and summaries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload onUploadComplete={() => setActiveTab("generate")} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generate" className="space-y-6 animate-fade-in">
            <ContentGenerator onContentGenerated={handleContentGenerated} />
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6 animate-fade-in">
            {quizData ? (
              <QuizInterface quizData={quizData} />
            ) : (
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">No Quiz Available</h3>
                  <p className="text-muted-foreground mb-4">Generate a quiz first by uploading content and selecting quiz generation.</p>
                  <Button 
                    onClick={() => setActiveTab("upload")}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <ProgressDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
