import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import type { Screen, UserData } from "../App";

interface SkillsGapPageProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
}

export function SkillsGapPage({ onNavigate, userData }: SkillsGapPageProps) {
  const handleBack = () => {
    // Navigate back to previous page (likely the dashboard or input page)
    onNavigate('dashboard'); // or 'input' depending on your app flow
  };

  // Mock data for skills analysis
  const getSkillsAnalysis = () => {
    const roleRequirements: Record<string, string[]> = {
      'Data Scientist': ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Pandas', 'Numpy', 'Scikit-learn', 'Tableau', 'R'],
      'AI Engineer': ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP'],
      'Web Developer': ['JavaScript', 'HTML/CSS', 'React', 'Node.js', 'Git', 'REST APIs', 'MongoDB', 'Express.js'],
      'Machine Learning Engineer': ['Python', 'TensorFlow', 'PyTorch', 'MLOps', 'Docker', 'Kubernetes', 'AWS', 'Model Deployment'],
      'Full Stack Developer': ['JavaScript', 'React', 'Node.js', 'SQL', 'MongoDB', 'HTML/CSS', 'Git', 'REST APIs', 'Docker'],
    };

    const requiredSkills = roleRequirements[userData.targetRole] || [];
    const userSkills = userData.skills.map(skill => skill.toLowerCase());
    
    const skillsMatched = requiredSkills.filter(skill => 
      userSkills.some(userSkill => userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill))
    );
    
    const skillsMissing = requiredSkills.filter(skill => 
      !userSkills.some(userSkill => userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill))
    );

    const readinessScore = Math.round((skillsMatched.length / requiredSkills.length) * 100);

    return {
      requiredSkills,
      skillsMatched,
      skillsMissing,
      readinessScore
    };
  };

  const analysis = getSkillsAnalysis();

  // Data for charts
  const barChartData = [
    { name: 'Current Skills', value: analysis.skillsMatched.length, fill: '#10B981' },
    { name: 'Missing Skills', value: analysis.skillsMissing.length, fill: '#EF4444' },
  ];

  const radarData = [
    { skill: 'Programming', current: 85, required: 90 },
    { skill: 'Frameworks', current: 70, required: 85 },
    { skill: 'Databases', current: 60, required: 80 },
    { skill: 'Tools', current: 75, required: 75 },
    { skill: 'Soft Skills', current: 80, required: 70 },
  ];

  return (
    <div className="min-h-screen px-8 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Added BackButton at the top */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl text-blue-900 mb-3">
            Skills Gap Analysis
          </h1>
          <p className="text-base text-gray-600">
            Analyzing your skills for <span className="text-blue-600">{userData.targetRole}</span>
          </p>
        </div>

        {/* Readiness Score */}
        <Card className="mb-6 border-2 border-blue-200">
          <CardContent className="pt-4">
            <div className="text-center space-y-3">
              <div className="text-3xl text-blue-600">{analysis.readinessScore}%</div>
              <p className="text-base text-gray-700">
                You are <strong>{analysis.readinessScore}% ready</strong> for {userData.targetRole}
              </p>
              <Progress value={analysis.readinessScore} className="w-full max-w-sm mx-auto" />
              <p className="text-xs text-gray-500">
                Based on {analysis.skillsMatched.length} matching skills out of {analysis.requiredSkills.length} required
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Chart Section - Top */}
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-center text-blue-700 text-lg">
              <TrendingUp className="mr-2 h-4 w-4" />
              Skills Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <center><ResponsiveContainer width="50%" height={200}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            </center>
          </CardContent>
        </Card>

        {/* Skills Cards Side by Side - Below Chart */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Skills You Have Card - Left */}
          <Card className="border-2 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-center text-green-700 text-base">
                <CheckCircle className="mr-2 h-4 w-4" />
                Skills You Have ({analysis.skillsMatched.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 justify-center">
                {analysis.skillsMatched.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-green-100 text-green-800 rounded-lg px-2 py-1 text-xs"
                  >
                    <CheckCircle className="mr-1 h-2 w-2" />
                    {skill}
                  </Badge>
                ))}
              </div>
              {analysis.skillsMatched.length === 0 && (
                <p className="text-gray-500 text-center py-2 text-sm">
                  No matching skills found.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Skills to Develop Card - Right */}
          <Card className="border-2 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-center text-red-700 text-base">
                <XCircle className="mr-2 h-4 w-4" />
                Skills to Develop ({analysis.skillsMissing.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1 justify-center">
                {analysis.skillsMissing.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="destructive"
                    className="bg-red-100 text-red-800 rounded-lg px-2 py-1 text-xs"
                  >
                    <XCircle className="mr-1 h-2 w-2" />
                    {skill}
                  </Badge>
                ))}
              </div>
              {analysis.skillsMissing.length === 0 && (
                <p className="text-green-600 text-center py-2 text-sm">
                  🎉 All skills covered!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => onNavigate('recommendations')}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-xl group transition-all transform hover:scale-105 text-sm"
          >
            Get Personalized Recommendations
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}