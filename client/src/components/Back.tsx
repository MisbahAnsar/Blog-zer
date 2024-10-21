import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function Back() {
  const handleGoBack = () => {
    window.history.back();
    console.log("meow");
  };

  return (
    <Button 
      onClick={handleGoBack}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Go Back
    </Button>
  );
}