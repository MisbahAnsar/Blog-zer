import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Back() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    window.history.back();
    navigate('/');
    console.log("meow");
  };

  return (
    <Button 
      onClick={handleGoBack}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
}