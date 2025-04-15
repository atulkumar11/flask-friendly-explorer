
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Don't send empty requests
    if (!inputText.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // This is where we would send data to a Flask backend
      // Replace this URL with your actual Flask backend URL when you set it up
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setResponseText(data.processed_text);
      
      toast({
        title: "Success!",
        description: "Data processed by Flask backend",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Connection Error",
        description: "Could not connect to Flask backend. Make sure it's running at http://localhost:5000",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">React + Flask Demo</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="input-text" className="text-sm font-medium">
              Enter text to send to Flask:
            </label>
            <Input
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type something..."
              className="w-full"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Send to Flask"}
          </Button>
        </form>
        
        {responseText && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-sm font-semibold mb-2">Response from Flask:</h2>
            <p className="text-gray-800">{responseText}</p>
          </div>
        )}
        
        <div className="mt-8 pt-4 border-t text-xs text-gray-500">
          <p className="text-center">
            Note: You need to run a Flask backend server at http://localhost:5000 to make this work.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
