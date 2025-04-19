
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    // Here we would normally authenticate with a backend
    // For demo purposes, we'll check local storage
    const storedUser = localStorage.getItem('sakha_user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email) {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in",
        });
        navigate('/dashboard');
        return;
      }
    }
    
    // For demo purposes, allow any login
    toast({
      title: "Demo login successful",
      description: "Welcome to Sakha AI dashboard",
    });
    
    // Store minimal user data for the demo
    localStorage.setItem('sakha_user', JSON.stringify({
      name: 'Demo User',
      email: email
    }));
    
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Login to continue your exam preparation journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="text-right">
              <Link to="/" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            
            <Button type="submit" className="w-full mt-6">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-primary font-medium">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
