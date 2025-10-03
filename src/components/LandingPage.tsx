import { Button } from "./ui/button";
import { Upload, Edit3 } from "lucide-react";
import type { Screen, UserData } from "../App";

interface LandingPageProps {
  onNavigate: (screen: Screen) => void;
  onUpdateData: (data: Partial<UserData>) => void;
}

export function LandingPage({ onNavigate, onUpdateData }: LandingPageProps) {
  const handleUploadResume = () => {
    onUpdateData({ uploadMethod: "resume" });
    onNavigate("input");
  };

  const handleEnterManually = () => {
    onUpdateData({ uploadMethod: "manual" });
    onNavigate("input");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        <div className="max-w-4xl text-center space-y-8">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-blue-900 mb-6">
            AI-Based Skills Gap Analyzer & Career Path Recommender
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Bridge the gap between where you are and where you want to be.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
            <Button
              onClick={handleUploadResume}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[280px]"
            >
              <Upload className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Upload Resume
            </Button>

            <Button
              onClick={handleEnterManually}
              className="group bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[280px]"
            >
              <Edit3 className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
              Enter Skills Manually
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-black py-6 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-2">
          <p className="text-sm">
            Developed by <span className="font-semibold">PoojaShree</span>
          </p>
          <p className="text-xs">&copy; {new Date().getFullYear()} All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
