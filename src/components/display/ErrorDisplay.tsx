import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ShieldAlert } from 'lucide-react';
import React from 'react';

interface ErrorDisplayProps {
  dialogOpen: boolean;
  dialogMessage: string;
  handleCloseDialog: () => void;
}
export default function ErrorDisplay({
  dialogOpen,
  dialogMessage,
  handleCloseDialog,
}: Readonly<ErrorDisplayProps>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true); // Indica que o componente foi montado
  }, []);

  return (
    <div className="grid">
      {mounted && (
        <AlertDialog open={dialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className=" items-center justify-center flex text-light-textPrimary dark:text-dark-textPrimary text-center">
                <ShieldAlert />
                {dialogMessage}
                <ShieldAlert />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleCloseDialog}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
