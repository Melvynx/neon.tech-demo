'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';

export default function page() {
  return (
    <div className="mt-4">
      <ExpensiveComponent />
    </div>
  );
}

const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

const ExpensiveComponent = () => {
  const isClient = useIsClient();

  // fake expensive computation
  // calculate time to render
  const start = Date.now();
  for (let i = 0; i < 500000; i++) {
    Math.random();
  }
  const end = Date.now();

  const time = end - start;

  if (!isClient) {
    return 'Loading...';
  }

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle>Expensive component</CardTitle>
        <CardDescription>This component took {time}ms to render</CardDescription>
      </CardHeader>
    </Card>
  );
};
