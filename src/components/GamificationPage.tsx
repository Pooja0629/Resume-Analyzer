import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Trophy, Star, Target, Users, ArrowLeft, CheckCircle, Clock, Zap } from "lucide-react";
import type { Screen, UserData } from "../App";

interface GamificationPageProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
}

export function GamificationPage({ onNavigate, userData }: GamificationPageProps) {
  // Mock user progress data
  const userProgress = {
    currentLevel: 3,
    xp: 1250,
    xpToNext: 500,
    completedSkills: 8,
    totalSkills: 12,
    streak: 7,
    badges: [
      { name: 'Python Beginner', icon: '🐍', earned: true, date: '2024-09-15' },
      { name: 'SQL Explorer', icon: '📊', earned: true, date: '2024-09-18' },
      { name: 'Git Master', icon: '🔧', earned: false, date: null },
      { name: 'Problem Solver', icon: '🧩', earned: true, date: '2024-09-12' },
      { name: 'Fast Learner', icon: '⚡', earned: false, date: null },
      { name: 'Consistency King', icon: '👑', earned: false, date: null },
    ]
  };

  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', xp: 2850, level: 5, avatar: '👩‍💻' },
    { rank: 2, name: 'Alex Johnson', xp: 2340, level: 4, avatar: '👨‍💼' },
    { rank: 3, name: 'You', xp: 1250, level: 3, avatar: '😊', isUser: true },
    { rank: 4, name: 'Michael Rodriguez', xp: 980, level: 3, avatar: '👨‍🔬' },
    { rank: 5, name: 'Emily Davis', xp: 750, level: 2, avatar: '👩‍🎓' },
  ];

  const milestones = [
    { title: 'Complete Python Fundamentals', progress: 100, completed: true },
    { title: 'Build First Project', progress: 60, completed: false },
    { title: 'SQL Mastery', progress: 80, completed: false },
    { title: 'Get First Certification', progress: 30, completed: false },
  ];

  const readinessPercentage = Math.round((userProgress.completedSkills / userProgress.totalSkills) * 100);

  return (
    <div className="min-h-screen px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl text-blue-900 mb-2">
              Progress Tracker
            </h1>
            <p className="text-lg text-gray-600">
              Track your journey to becoming a {userData.targetRole}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => onNavigate('dashboard')}
            className="rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Main Progress Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl text-blue-600 mb-1">{readinessPercentage}%</div>
                <p className="text-sm text-gray-600">Job Ready</p>
                <Progress value={readinessPercentage} className="mt-2" />
              </div>
              <div>
                <div className="text-3xl text-green-600 mb-1">Level {userProgress.currentLevel}</div>
                <p className="text-sm text-gray-600">{userProgress.xp} XP</p>
                <Progress value={(userProgress.xp / (userProgress.xp + userProgress.xpToNext)) * 100} className="mt-2" />
              </div>
              <div>
                <div className="text-3xl text-purple-600 mb-1">{userProgress.completedSkills}/{userProgress.totalSkills}</div>
                <p className="text-sm text-gray-600">Skills Mastered</p>
                <div className="text-xs text-gray-500 mt-1">3 more to reach 80%</div>
              </div>
              <div>
                <div className="text-3xl text-orange-600 mb-1">{userProgress.streak}</div>
                <p className="text-sm text-gray-600">Day Streak</p>
                <div className="flex justify-center mt-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Achievement Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <Trophy className="mr-2 h-5 w-5" />
                Achievement Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {userProgress.badges.map((badge, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      badge.earned
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <p className="text-sm font-medium text-gray-800">{badge.name}</p>
                    {badge.earned ? (
                      <div className="flex items-center justify-center mt-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">Earned</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center mt-2">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-400">Locked</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Users className="mr-2 h-5 w-5" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboardData.map((user, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.isUser
                        ? 'bg-blue-50 border-2 border-blue-200'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                        user.rank === 1 ? 'bg-yellow-500' :
                        user.rank === 2 ? 'bg-gray-400' :
                        user.rank === 3 ? 'bg-orange-500' : 'bg-gray-300'
                      }`}>
                        {user.rank}
                      </div>
                      <span className="text-2xl">{user.avatar}</span>
                      <div>
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-sm text-gray-500">Level {user.level}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">{user.xp} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Milestones */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <Target className="mr-2 h-5 w-5" />
              Learning Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    milestone.completed ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-white text-xs">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-gray-800">{milestone.title}</p>
                      <span className="text-sm text-gray-600">{milestone.progress}%</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivational Section */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl text-gray-800">🎯 Keep Going!</h3>
              <p className="text-gray-600">
                You're making great progress! Complete <strong>3 more skills</strong> to reach 80% job readiness.
              </p>
              <div className="flex justify-center space-x-4">
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                  Next: Complete React Fundamentals
                </Badge>
                <Badge className="bg-green-100 text-green-800 px-4 py-2">
                  +200 XP when completed
                </Badge>
              </div>
              <Button
                onClick={() => onNavigate('recommendations')}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
              >
                Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}