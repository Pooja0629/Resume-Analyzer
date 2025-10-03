import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock, BookOpen, Award, ExternalLink, Download, Calendar } from "lucide-react";
import type { Screen, UserData } from "../App";

interface RecommendationsPageProps {
  onNavigate: (screen: Screen) => void;
  userData: UserData;
}

export function RecommendationsPage({ onNavigate, userData }: RecommendationsPageProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const getRecommendations = () => {
    const recommendations = {
      'Data Scientist': {
        shortTerm: [
          { skill: 'Pandas Data Manipulation', resource: 'Coursera', link: 'https://coursera.org', duration: '1 week' },
          { skill: 'SQL Fundamentals', resource: 'W3Schools', link: 'https://w3schools.com', duration: '2 weeks' },
          { skill: 'Data Visualization with Matplotlib', resource: 'YouTube', link: 'https://youtube.com', duration: '1 week' }
        ],
        mediumTerm: [
          { skill: 'Machine Learning with Scikit-learn', resource: 'edX', link: 'https://edx.org', duration: '1 month' },
          { skill: 'Statistics for Data Science', resource: 'Khan Academy', link: 'https://khanacademy.org', duration: '2 months' },
          { skill: 'Advanced Python Programming', resource: 'Codecademy', link: 'https://codecademy.com', duration: '1.5 months' }
        ],
        longTerm: [
          { skill: 'AWS Certified Data Analytics', resource: 'AWS Training', link: 'https://aws.amazon.com', duration: '6 months' },
          { skill: 'Deep Learning Specialization', resource: 'Coursera', link: 'https://coursera.org', duration: '4 months' },
          { skill: 'Complete a Kaggle Competition', resource: 'Kaggle', link: 'https://kaggle.com', duration: '3 months' }
        ]
      },
      'Web Developer': {
        shortTerm: [
          { skill: 'ES6+ JavaScript Features', resource: 'MDN Web Docs', link: 'https://developer.mozilla.org', duration: '1 week' },
          { skill: 'CSS Flexbox & Grid', resource: 'CSS-Tricks', link: 'https://css-tricks.com', duration: '1 week' },
          { skill: 'Git Version Control', resource: 'GitHub Learning Lab', link: 'https://github.com', duration: '2 weeks' }
        ],
        mediumTerm: [
          { skill: 'React.js Fundamentals', resource: 'React Official Tutorial', link: 'https://react.dev', duration: '1 month' },
          { skill: 'Node.js & Express.js', resource: 'freeCodeCamp', link: 'https://freecodecamp.org', duration: '2 months' },
          { skill: 'RESTful API Development', resource: 'Postman Learning Center', link: 'https://learning.postman.com', duration: '1 month' }
        ],
        longTerm: [
          { skill: 'AWS Cloud Practitioner Certification', resource: 'AWS', link: 'https://aws.amazon.com', duration: '3 months' },
          { skill: 'Full-Stack Portfolio Project', resource: 'Self-directed', link: '#', duration: '4 months' },
          { skill: 'Docker & Containerization', resource: 'Docker Documentation', link: 'https://docs.docker.com', duration: '2 months' }
        ]
      },
      'AI Engineer': {
        shortTerm: [
          { skill: 'Python for AI', resource: 'Python.org', link: 'https://python.org', duration: '2 weeks' },
          { skill: 'NumPy & Linear Algebra', resource: 'NumPy Documentation', link: 'https://numpy.org', duration: '1 week' },
          { skill: 'Introduction to Neural Networks', resource: 'YouTube - 3Blue1Brown', link: 'https://youtube.com', duration: '1 week' }
        ],
        mediumTerm: [
          { skill: 'TensorFlow 2.0', resource: 'TensorFlow Documentation', link: 'https://tensorflow.org', duration: '2 months' },
          { skill: 'Computer Vision with OpenCV', resource: 'OpenCV Tutorials', link: 'https://opencv.org', duration: '1.5 months' },
          { skill: 'Natural Language Processing', resource: 'spaCy Documentation', link: 'https://spacy.io', duration: '2 months' }
        ],
        longTerm: [
          { skill: 'TensorFlow Developer Certification', resource: 'Google', link: 'https://tensorflow.org/certificate', duration: '4 months' },
          { skill: 'MLOps with Kubernetes', resource: 'Kubeflow', link: 'https://kubeflow.org', duration: '3 months' },
          { skill: 'Build an AI Product End-to-End', resource: 'Self-directed', link: '#', duration: '6 months' }
        ]
      }
    };

    return recommendations[userData.targetRole as keyof typeof recommendations] || recommendations['Data Scientist'];
  };

  const handleBack = () => {
    onNavigate('dashboard');
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
      // Simple text-based PDF generation
      const recommendations = getRecommendations();
      
      // Create PDF content as text
      let pdfContent = `AI-Powered Career Roadmap\n`;
      pdfContent += `Personalized learning path for ${userData.targetRole}\n`;
      pdfContent += `Generated on: ${new Date().toLocaleDateString()}\n\n`;
      pdfContent += `========================================\n\n`;
      
      // Short Term
      pdfContent += `SHORT-TERM GOALS (1-2 weeks)\n`;
      pdfContent += `============================\n`;
      recommendations.shortTerm.forEach((item, index) => {
        pdfContent += `${index + 1}. ${item.skill}\n`;
        pdfContent += `   Resource: ${item.resource}\n`;
        pdfContent += `   Duration: ${item.duration}\n`;
        pdfContent += `   Link: ${item.link}\n\n`;
      });
      
      pdfContent += `\n`;
      
      // Medium Term
      pdfContent += `MEDIUM-TERM GOALS (1-3 months)\n`;
      pdfContent += `==============================\n`;
      recommendations.mediumTerm.forEach((item, index) => {
        pdfContent += `${index + 1}. ${item.skill}\n`;
        pdfContent += `   Resource: ${item.resource}\n`;
        pdfContent += `   Duration: ${item.duration}\n`;
        pdfContent += `   Link: ${item.link}\n\n`;
      });
      
      pdfContent += `\n`;
      
      // Long Term
      pdfContent += `LONG-TERM GOALS\n`;
      pdfContent += `===============\n`;
      recommendations.longTerm.forEach((item, index) => {
        pdfContent += `${index + 1}. ${item.skill}\n`;
        pdfContent += `   Resource: ${item.resource}\n`;
        pdfContent += `   Duration: ${item.duration}\n`;
        pdfContent += `   Link: ${item.link}\n\n`;
      });
      
      pdfContent += `\n`;
      pdfContent += `NEXT STEPS\n`;
      pdfContent += `==========\n`;
      pdfContent += `This Week: ${recommendations.shortTerm[0]?.skill}\n`;
      pdfContent += `This Month: ${recommendations.mediumTerm[0]?.skill}\n`;
      pdfContent += `This Quarter: ${recommendations.longTerm[0]?.skill}\n\n`;
      pdfContent += `Generated by Resume Analyzer`;

      // Create and download text file (simpler alternative to PDF)
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${userData.targetRole.toLowerCase().replace(/\s+/g, '-')}-career-roadmap.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('PDF Generation Error:', error);
      // Fallback: Open print dialog
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const recommendations = getRecommendations();

  const TimelineCard = ({ 
    title, 
    items, 
    icon: Icon, 
    color, 
    bgColor 
  }: { 
    title: string; 
    items: any[]; 
    icon: any; 
    color: string; 
    bgColor: string; 
  }) => (
    <Card className={`border-2 ${bgColor} hover:shadow-lg transition-shadow`}>
      <CardHeader>
        <CardTitle className={`flex items-center ${color}`}>
          <Icon className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-medium text-gray-900">{item.skill}</h4>
                <Badge variant="outline" className="text-xs">
                  <Clock className="mr-1 h-3 w-3" />
                  {item.duration}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  <BookOpen className="inline mr-1 h-3 w-3" />
                  {item.resource}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-3 text-xs"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen px-8 py-16">
      <div className="max-w-7xl mx-auto">
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

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl text-blue-900 mb-4">
            AI-Powered Career Roadmap
          </h1>
          <p className="text-lg text-gray-600">
            Personalized learning path for <span className="text-blue-600">{userData.targetRole}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <TimelineCard
            title="Short-Term (1-2 weeks)"
            items={recommendations.shortTerm}
            icon={Clock}
            color="text-blue-700"
            bgColor="border-blue-200"
          />
          
          <TimelineCard
            title="Medium-Term (1-3 months)"
            items={recommendations.mediumTerm}
            icon={Calendar}
            color="text-green-700"
            bgColor="border-green-200"
          />
          
          <TimelineCard
            title="Long-Term Goals"
            items={recommendations.longTerm}
            icon={Award}
            color="text-purple-700"
            bgColor="border-purple-200"
          />
        </div>

        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg text-gray-800">🎯 Your Next Steps</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-blue-700 font-medium">This Week</p>
                  <p className="text-gray-600">Start with {recommendations.shortTerm[0]?.skill}</p>
                </div>
                <div>
                  <p className="text-green-700 font-medium">This Month</p>
                  <p className="text-gray-600">Focus on {recommendations.mediumTerm[0]?.skill}</p>
                </div>
                <div>
                  <p className="text-purple-700 font-medium">This Quarter</p>
                  <p className="text-gray-600">Work towards {recommendations.longTerm[0]?.skill}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl group transition-all"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
          >
            <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            {isGeneratingPDF ? 'Generating PDF...' : 'Download Roadmap '}
          </Button>
        </div>
      </div>
    </div>
  );
}