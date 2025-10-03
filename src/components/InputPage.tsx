import { useState, useRef } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { BackButton } from "./ui/button"; // Changed from back-button to button
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Upload, Plus, X, ArrowRight } from "lucide-react";
import type { Screen, UserData } from "../App";

interface InputPageProps {
  onNavigate: (screen: Screen) => void;
  onUpdateData: (data: Partial<UserData>) => void;
  userData: UserData;
}

export function InputPage({ onNavigate, onUpdateData, userData }: InputPageProps) {
  const [currentSkill, setCurrentSkill] = useState('');
  const [skills, setSkills] = useState<string[]>(userData.skills);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      const newSkills = [...skills, currentSkill.trim()];
      setSkills(newSkills);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(newSkills);
  };

  const handleBack = () => {
    // Navigate back to previous page
    onNavigate('home'); // or whatever your previous screen is called
  };

  const handleNext = () => {
    onUpdateData({ skills });
    onNavigate('dashboard');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Optional: parse dropped file here
  };
  
  // ✅ Updated: send file to backend
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/upload_resume/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Extracted skills:", data.skills);

      if (data.skills && data.skills.length > 0) {
        setSkills(data.skills);
      } else {
        alert("No skills found in resume");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume. Make sure backend is running.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-16">
      {/* Added BackButton here - at the very top left */}
      <div className="max-w-4xl w-full">
        <div className="mb-6">
          <BackButton onClick={handleBack} />
        </div>
        
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl text-blue-900 mb-4">
              Input Your Skills
            </h1>
            <p className="text-lg text-gray-600">
              Choose how you'd like to provide your skills information
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Option A: Upload Resume */}
            <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Upload className="mr-2 h-5 w-5" />
                  Option A: Upload Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragOver
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop your resume here
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Supports PDF and DOC files
                  </p>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />

                  <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Browse Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Option B: Manual Entry */}
            <Card className="border-2 border-gray-300 hover:border-green-400 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Plus className="mr-2 h-5 w-5" />
                  Option B: Enter Skills Manually
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., Python, SQL, React..."
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="rounded-lg"
                    />
                    <Button
                      onClick={addSkill}
                      className="bg-green-600 hover:bg-green-700 rounded-lg px-6"
                    >
                      Add
                    </Button>
                  </div>

                  <div className="min-h-[120px]">
                    {skills.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Your skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-green-100 text-green-800 hover:bg-green-200 rounded-lg px-3 py-1"
                            >
                              {skill}
                              <X
                                className="ml-2 h-3 w-3 cursor-pointer hover:text-red-600"
                                onClick={() => removeSkill(skill)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Button */}
          <div className="flex justify-center pt-8">
            <Button
              onClick={handleNext}
              disabled={skills.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              Next
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}