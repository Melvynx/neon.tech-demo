import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function Page() {
  return (
    <div className="mt-4 flex flex-col gap-4 bg-red-500/10 p-4">
      <Alert variant="info">
        <AlertTriangle size={16} />
        <AlertTitle>This is an info alert — check it out!</AlertTitle>

        <AlertDescription>Some description</AlertDescription>
      </Alert>
    </div>
  );
}
