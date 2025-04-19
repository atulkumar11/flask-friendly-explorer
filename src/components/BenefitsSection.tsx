
import { BookOpen, Calendar, LineChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const benefits = [
  {
    title: 'Personalized study plans',
    description: 'Get customized learning paths based on your strengths and areas that need improvement.',
    icon: BookOpen
  },
  {
    title: 'Emotional check-ins',
    description: 'We adapt to how you're feeling to provide the right kind of support when you need it most.',
    icon: Calendar
  },
  {
    title: 'Practice exams & progress tracking',
    description: 'Take practice tests that mimic real exams and track your improvement over time.',
    icon: LineChart
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-2">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
