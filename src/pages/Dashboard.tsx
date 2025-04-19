
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown, BookOpen, LineChart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is logged in (for demo purposes)
    const storedUser = localStorage.getItem('sakha_user');
    if (!storedUser) {
      toast({
        title: "Please log in",
        description: "You need to log in to access the dashboard",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    try {
      const user = JSON.parse(storedUser);
      setUserName(user.name || 'User');
      setCurrentMood(user.mood || null);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
  }, [navigate]);
  
  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
    
    // Update user mood in local storage
    const storedUser = localStorage.getItem('sakha_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        user.mood = mood;
        localStorage.setItem('sakha_user', JSON.stringify(user));
      } catch (error) {
        console.error('Error updating user mood:', error);
      }
    }
    
    toast({
      title: "Mood updated",
      description: `Thanks for letting us know how you're feeling.`,
    });
  };
  
  const handleLogout = () => {
    // For demo purposes, just remove the user from local storage
    localStorage.removeItem('sakha_user');
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Sakha AI</h1>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, {userName} 👋</h2>
          <p className="text-gray-600 mt-1">Let's continue your exam preparation journey today.</p>
        </div>
        
        <section className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>How are you feeling today?</CardTitle>
              <CardDescription>This helps us tailor your content and suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-6">
                <Button
                  variant={currentMood === 'good' ? 'default' : 'outline'}
                  className="flex flex-col items-center p-3"
                  onClick={() => handleMoodSelection('good')}
                >
                  <Smile className="h-8 w-8 mb-1" />
                  <span>Good</span>
                </Button>
                
                <Button
                  variant={currentMood === 'neutral' ? 'default' : 'outline'}
                  className="flex flex-col items-center p-3"
                  onClick={() => handleMoodSelection('neutral')}
                >
                  <Meh className="h-8 w-8 mb-1" />
                  <span>Neutral</span>
                </Button>
                
                <Button
                  variant={currentMood === 'worried' ? 'default' : 'outline'}
                  className="flex flex-col items-center p-3"
                  onClick={() => handleMoodSelection('worried')}
                >
                  <Frown className="h-8 w-8 mb-1" />
                  <span>Worried</span>
                </Button>
              </div>
              
              {currentMood && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md text-center">
                  {currentMood === 'good' && (
                    <p>Great to hear you're feeling good! Let's make the most of your energy today.</p>
                  )}
                  {currentMood === 'neutral' && (
                    <p>Let's focus on building momentum with some achievable goals today.</p>
                  )}
                  {currentMood === 'worried' && (
                    <p>It's normal to feel worried about your exams. Let's break things down into smaller, manageable tasks.</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
        
        <section className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-primary" />
                <CardTitle>Take a Practice Test</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Test your knowledge with practice questions and get instant feedback.</p>
              <Button>Start Practice Test</Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center">
                <LineChart className="h-6 w-6 mr-2 text-primary" />
                <CardTitle>Your Progress & Weak Areas</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Review your performance analytics and focus on improvement areas.</p>
              <Button>View Progress</Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
