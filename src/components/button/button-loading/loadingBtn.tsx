import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function ButtonLoading() {
  return (
    <Button disabled className="justify-center items-center">
      <Loader2 className="h-4 w-4 animate-spin box" />
    </Button>
  );
}
