import { ShieldAlert } from 'lucide-react';

export default function ErrorDisplay() {
  return (
    <div className="items-center justify-center grid">
      <div>
        <h1 className="title">Algo deu errado!</h1>
        <ShieldAlert className="items-center justify-center" />
      </div>
    </div>
  );
}
