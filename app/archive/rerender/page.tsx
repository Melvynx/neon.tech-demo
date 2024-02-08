'use client';

import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  return (
    <div className="w-full h-full flex justify-start mt-8 flex-col gap-2 items-center">
      <UsernameForm />
      <Button
        onClick={() => {
          toast.success('This is a success toast');
        }}
      >
        Show toast
      </Button>
      <Counter />
    </div>
  );
}

const UsernameForm = () => {
  const [username, setUsername] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={(e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }}
    >
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p>
        {username} ({mousePosition.x}, {mousePosition.y})
      </p>
      <FooterCard />
    </div>
  );
};

const FooterCard = () => {
  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle>Title</CardTitle>
        <CardDescription>Subtitle</CardDescription>
      </CardHeader>
    </Card>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>+</Button>
      <span>{count}</span>
      <Button onClick={() => setCount(count - 1)}>-</Button>
    </div>
  );
};
