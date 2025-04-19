
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Study Smart. Feel Understood.
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
          An emotionally-aware learning companion built to guide you through your exam journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="text-lg py-6 px-8" 
            onClick={() => navigate('/signup')}
          >
            Sign Up Free
          </Button>
          <Button 
            variant="outline" 
            className="text-lg py-6 px-8" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
