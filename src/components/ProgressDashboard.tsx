
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Trophy, Target, Clock, TrendingUp, Calendar, Brain } from "lucide-react";

export const ProgressDashboard = () => {
  const [results, setResults] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0
  });

  useEffect(() => {
    // Load results from localStorage for demo
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    setResults(savedResults);

    if (savedResults.length > 0) {
      const totalQuizzes = savedResults.length;
      const averageScore = savedResults.reduce((acc: number, result: any) => acc + (result.score / result.total * 100), 0) / totalQuizzes;
      const bestScore = Math.max(...savedResults.map((result: any) => result.score / result.total * 100));
      const totalTimeSpent = savedResults.reduce((acc: number, result: any) => acc + (result.timeSpent || 0), 0);

      setStats({
        totalQuizzes,
        averageScore: Math.round(averageScore),
        bestScore: Math.round(bestScore),
        totalTimeSpent
      });
    }
  }, []);

  // Mock data for charts
  const progressData = [
    { date: '2024-01-01', score: 65 },
    { date: '2024-01-02', score: 72 },
    { date: '2024-01-03', score: 68 },
    { date: '2024-01-04', score: 85 },
    { date: '2024-01-05', score: 90 },
    { date: '2024-01-06', score: 88 },
    { date: '2024-01-07', score: 95 },
  ];

  const difficultyData = [
    { difficulty: 'Easy', count: 5, average: 92 },
    { difficulty: 'Medium', count: 8, average: 76 },
    { difficulty: 'Hard', count: 3, average: 64 },
  ];

  const pieData = [
    { name: 'Correct', value: 75, color: '#10b981' },
    { name: 'Incorrect', value: 25, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Quizzes</p>
                <p className="text-2xl font-bold">{stats.totalQuizzes}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold">{stats.averageScore}%</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Best Score</p>
                <p className="text-2xl font-bold">{stats.bestScore}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time Spent</p>
                <p className="text-2xl font-bold">{Math.round(stats.totalTimeSpent / 60)}m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Progress Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Progress Over Time
            </CardTitle>
            <CardDescription>Your quiz performance trend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance by Difficulty */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Performance by Difficulty
            </CardTitle>
            <CardDescription>Average scores across difficulty levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={difficultyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="difficulty" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="average" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest quiz attempts</CardDescription>
        </CardHeader>
        <CardContent>
          {results.length > 0 ? (
            <div className="space-y-4">
              {results.slice(-5).reverse().map((result: any, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium">Quiz Completed</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={result.score / result.total >= 0.8 ? "default" : "secondary"}>
                      {result.difficulty}
                    </Badge>
                    <div className="text-right">
                      <p className="font-medium">{result.score}/{result.total}</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((result.score / result.total) * 100)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No quiz results yet. Take your first quiz to see your progress!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
