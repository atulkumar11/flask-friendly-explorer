
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Meh, Frown } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mood, setMood] = useState<string | null>(null);
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would normally handle the signup with a backend
    // For now, we'll just redirect to the dashboard
    toast({
      title: "Account created!",
      description: "Welcome to Sakha AI",
    });
    
    // Store user data for demo purposes
    localStorage.setItem('sakha_user', JSON.stringify({
      name,
      email,
      mood
    }));
    
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Join Sakha AI to start your exam preparation journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Create a password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="pt-4">
              <p className="text-sm font-medium mb-3">How are you feeling about your exam prep today?</p>
              <div className="flex justify-center gap-6">
                <Button
                  type="button"
                  variant={mood === 'good' ? 'default' : 'outline'}
                  className="flex flex-col items-center p-3"
                  onClick={() => setMood('good')}
                >
                  <Smile className="h-8 w-8 mb-1" />
                  <span>Good</span>
                </Button>
                
                <Button
                  type="button"
                  variant={mood === 'neutral' ? 'default' : 'outline'}
                  className="flex flex-col items-center p-3"
                  onClick={() => setMood('neutral')}
                >
                  <Meh className="h-8 w-8 mb-1" />
                  <span>Neutral</span>
                </Button>
                
                <Button
                  type="button"
                  variant={mood === 'worried' ? 'default' : 'outline'}
                  className="flex flex-col items-center p-3"
                  onClick={() => setMood('worried')}
                >
                  <Frown className="h-8 w-8 mb-1" />
                  <span>Worried</span>
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full mt-6">Create Account</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-primary font-medium">Log in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
