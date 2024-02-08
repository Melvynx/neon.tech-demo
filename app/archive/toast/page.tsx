'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Page() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button
        onClick={() => {
          toast.success('This is a success toast');
        }}
      >
        Show toast
      </Button>
    </div>
  );
}
