
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, Trophy, Brain } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizInterfaceProps {
  quizData: {
    questions: Question[];
    difficulty: string;
    metadata: any;
  };
}

export const QuizInterface = ({ quizData }: QuizInterfaceProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      completeQuiz();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        description: "Choose an option before proceeding.",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === quizData.questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleContinue = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    setIsCompleted(true);
    
    // Save results to localStorage for demo
    const result = {
      score,
      total: quizData.questions.length,
      difficulty: quizData.difficulty,
      completedAt: new Date().toISOString(),
      timeSpent: 300 - timeLeft
    };
    
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    savedResults.push(result);
    localStorage.setItem('quizResults', JSON.stringify(savedResults));

    toast({
      title: "Quiz completed!",
      description: `You scored ${score}/${quizData.questions.length} (${Math.round((score / quizData.questions.length) * 100)}%)`,
    });
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
    setTimeLeft(300);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="h-16 w-16 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
          <CardDescription>Here are your results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-primary">
              {score}/{quizData.questions.length}
            </div>
            <div className="text-2xl font-semibold">
              {percentage}%
            </div>
            <Badge variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"} className="px-4 py-2 text-lg">
              {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-red-600">{quizData.questions.length - score}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={restartQuiz} variant="outline" className="flex-1">
              Retake Quiz
            </Button>
            <Button className="flex-1">
              View Progress
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = quizData.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Brain className="h-3 w-3" />
            {quizData.difficulty.charAt(0).toUpperCase() + quizData.difficulty.slice(1)}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {formatTime(timeLeft)}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Question {currentQuestion + 1} of {quizData.questions.length}</span>
          <span>Score: {score}/{quizData.questions.length}</span>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`w-full text-left justify-start h-auto p-4 ${
                  showExplanation
                    ? index === question.correct
                      ? "bg-green-100 border-green-500 text-green-800"
                      : index === selectedAnswer && selectedAnswer !== question.correct
                      ? "bg-red-100 border-red-500 text-red-800"
                      : ""
                    : ""
                }`}
                onClick={() => !showExplanation && handleAnswerSelect(index)}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showExplanation && index === question.correct && (
                    <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                  )}
                  {showExplanation && index === selectedAnswer && selectedAnswer !== question.correct && (
                    <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
            <p className="text-blue-800">{question.explanation}</p>
          </div>
        )}

        <div className="flex justify-end">
          {!showExplanation ? (
            <Button onClick={handleNext} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleContinue}>
              {currentQuestion < quizData.questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
