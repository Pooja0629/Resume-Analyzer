import { useState } from 'react';
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart3, Target, Zap } from "lucide-react";
import type { Screen, UserData } from "../App";

interface DashboardPageProps {
  onNavigate: (screen: Screen) => void;
  onUpdateData: (data: Partial<UserData>) => void;
  userData: UserData;
}

export function DashboardPage({ onNavigate, onUpdateData, userData }: DashboardPageProps) {
  const [selectedRole, setSelectedRole] = useState(userData.targetRole);

  const handleBack = () => {
    // Navigate back to previous page (likely the input page)
    onNavigate('input');
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    onUpdateData({ targetRole: role });
  };

  const handleAnalyze = () => {
    if (selectedRole) {
      onNavigate('skillsgap');
    }
  };

  const targetRoles = [
    'Data Scientist',
    'AI Engineer',
    'Web Developer',
    'Machine Learning Engineer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Product Manager',
    'UX Designer'
  ];

  return (
    <div className="min-h-screen px-8 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Added BackButton at the top */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl text-blue-900 mb-4">
            Skills Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Review your skills and select your target role
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel: Skills */}
          <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
                <Zap className="mr-2 h-5 w-5" />
                Your Current Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {userData.skills.map((skill, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg px-4 py-2 text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No skills added yet. Go back to add your skills.
                  </p>
                )}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>{userData.skills.length}</strong> skills identified
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Skills extracted from your {userData.uploadMethod === 'resume' ? 'resume' : 'manual input'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
           
          {/* Right Panel: Role Selection */}
          <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Target className="mr-2 h-5 w-5" />
                Select Target Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    What role are you targeting?
                  </label>
                  <Select value={selectedRole} onValueChange={handleRoleSelect}>
                    <SelectTrigger className="w-full rounded-lg">
                      <SelectValue placeholder="Choose your target role..." />
                    </SelectTrigger>
                    <SelectContent>
                      {targetRoles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRole && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Selected:</strong> {selectedRole}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      We'll analyze your skills against this role's requirements
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="text-sm text-gray-700 mb-2">Popular Roles</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {targetRoles.slice(0, 4).map((role) => (
                      <button
                        key={role}
                        onClick={() => handleRoleSelect(role)}
                        className={`text-xs p-2 rounded-lg text-left transition-colors ${
                          selectedRole === role ? 'bg-green-200 text-green-800' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            onClick={handleAnalyze}
            disabled={!selectedRole || userData.skills.length === 0}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BarChart3 className="mr-2 h-5 w-5" />
            Analyze Skills Gap
          </Button>
        </div>
      </div>
    </div>
  );
}