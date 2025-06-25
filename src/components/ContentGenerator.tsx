
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Brain, FileText, HelpCircle, Loader2, Zap } from "lucide-react";

interface ContentGeneratorProps {
  onContentGenerated: (content: any) => void;
}

export const ContentGenerator = ({ onContentGenerated }: ContentGeneratorProps) => {
  const [generationType, setGenerationType] = useState("quiz");
  const [difficulty, setDifficulty] = useState("medium");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockContent = {
      type: generationType,
      difficulty: difficulty,
      questions: generationType === "quiz" ? [
        {
          id: 1,
          question: "What is the time complexity of a binary search algorithm?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correct: 1,
          explanation: "Binary search divides the search space in half with each comparison, resulting in logarithmic time complexity."
        },
        {
          id: 2,
          question: "Which data structure uses LIFO (Last In, First Out) principle?",
          options: ["Queue", "Stack", "Array", "LinkedList"],
          correct: 1,
          explanation: "A stack follows the LIFO principle where the last element added is the first one to be removed."
        },
        {
          id: 3,
          question: "What does 'async/await' help with in JavaScript?",
          options: ["Synchronous operations", "Asynchronous operations", "Variable declarations", "Loop iterations"],
          correct: 1,
          explanation: "Async/await syntax helps handle asynchronous operations in a more readable, synchronous-looking manner."
        }
      ] : [
        {
          question: "What is a binary search tree?",
          answer: "A binary search tree is a hierarchical data structure where each node has at most two children, and the left subtree contains values less than the parent node while the right subtree contains values greater than the parent node."
        },
        {
          question: "How do you implement recursion?",
          answer: "Recursion is implemented by having a function call itself with modified parameters, along with a base case that stops the recursive calls to prevent infinite loops."
        }
      ],
      metadata: {
        generatedAt: new Date().toISOString(),
        source: "uploaded_files",
        totalQuestions: generationType === "quiz" ? 3 : 2
      }
    };

    setIsGenerating(false);
    
    toast({
      title: "Content generated successfully!",
      description: `Generated ${generationType} with ${mockContent.metadata.totalQuestions} items at ${difficulty} difficulty.`,
    });

    onContentGenerated(mockContent);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Content Generation Options
          </CardTitle>
          <CardDescription>
            Choose how you want to transform your uploaded content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Generation Type */}
          <div>
            <Label className="text-base font-medium mb-4 block">Generation Type</Label>
            <RadioGroup value={generationType} onValueChange={setGenerationType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quiz" id="quiz" />
                <Label htmlFor="quiz" className="flex items-center gap-2 cursor-pointer">
                  <HelpCircle className="h-4 w-4" />
                  Interactive Quiz
                  <Badge variant="secondary">Multiple Choice</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="summary" id="summary" />
                <Label htmlFor="summary" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  Q&A Summary
                  <Badge variant="secondary">Study Guide</Badge>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Difficulty Level */}
          <div>
            <Label className="text-base font-medium mb-4 block">Difficulty Level</Label>
            <RadioGroup value={difficulty} onValueChange={setDifficulty}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy" className="cursor-pointer">
                  <span className="font-medium text-green-600">Easy</span>
                  <span className="text-muted-foreground ml-2">Basic concepts and definitions</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">
                  <span className="font-medium text-orange-600">Medium</span>
                  <span className="text-muted-foreground ml-2">Application and understanding</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard" className="cursor-pointer">
                  <span className="font-medium text-red-600">Hard</span>
                  <span className="text-muted-foreground ml-2">Advanced analysis and problem-solving</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate} 
            className="w-full h-12 text-lg"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Zap className="h-5 w-5 mr-2" />
                Generate {generationType === "quiz" ? "Quiz" : "Summary"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Quiz Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Interactive multiple-choice questions with explanations and progress tracking.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Summary Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Comprehensive Q&A pairs covering key concepts from your content.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
