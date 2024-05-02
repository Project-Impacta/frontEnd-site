import { Loader2 } from 'lucide-react';

export default function LoadingDisplay() {
  return (
    <div className="items-center justify-center grid">
      <div>
        <h1 className="title">Carregando...</h1>
        <Loader2 className="h-4 w-4 animate-spin box" />
      </div>
    </div>
  );
}
