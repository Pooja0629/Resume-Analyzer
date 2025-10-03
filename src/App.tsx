import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { InputPage } from './components/InputPage';
import { DashboardPage } from './components/DashboardPage';
import { SkillsGapPage } from './components/SkillsGapPage';
import { RecommendationsPage } from './components/RecommendationsPage';


export type Screen = 'landing' | 'input' | 'dashboard' | 'skillsgap' | 'recommendations';

export interface UserData {
  skills: string[];
  targetRole: string;
  uploadMethod: 'resume' | 'manual';
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [userData, setUserData] = useState<UserData>({
    skills: [],
    targetRole: '',
    uploadMethod: 'manual'
  });

  // Function to navigate between screens
  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  // Function to update user data
  const updateUserData = (newData: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  // Function to render the current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onNavigate={navigate} onUpdateData={updateUserData} />;
      case 'input':
        return <InputPage onNavigate={navigate} onUpdateData={updateUserData} userData={userData} />;
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} onUpdateData={updateUserData} userData={userData} />;
      case 'skillsgap':
        return <SkillsGapPage onNavigate={navigate} userData={userData} />;
      case 'recommendations':
        return <RecommendationsPage onNavigate={navigate} userData={userData} />;
      default:
        return <LandingPage onNavigate={navigate} onUpdateData={updateUserData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 font-sans">
      {renderScreen()}
    </div>
  );
}
