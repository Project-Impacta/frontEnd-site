import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface LoadingDisplayProps {
  dialogOpen: boolean;
}
export default function LoadingDisplay({
  dialogOpen,
}: Readonly<LoadingDisplayProps>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true); // Indica que o componente foi montado
  }, []);

  return (
    <div className="items-center justify-center grid">
      {mounted && (
        <AlertDialog open={dialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className=" title items-center justify-center  flex text-light-textPrimary dark:text-dark-textPrimary text-center">
                Carregando...
                <Loader2 className="h-6 w-6 animate-spin box ml-2" />
              </AlertDialogTitle>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
