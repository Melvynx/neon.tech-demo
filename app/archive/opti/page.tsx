'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PropsWithChildren, useState } from 'react';

export default function Page() {
  return (
    <div className="my-8 flex flex-col gap-4">
      <UsernameWrapper>
        <ExpensiveComponent />
      </UsernameWrapper>
      <FooterCard />
    </div>
  );
}

const UsernameWrapper = ({ children }: PropsWithChildren) => {
  const [username, setUsername] = useState('');
  return (
    <>
      <HeaderCard username={username} />
      {children}
      <UsernameForm setUsername={setUsername} username={username} />
    </>
  );
};

const UsernameForm = ({
  setUsername,
  username,
}: {
  setUsername: (username: string) => void;
  username: string;
}) => {
  return (
    <div>
      <Input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
};

const ExpensiveComponent = () => {
  // fake expensive computation
  // calculate time to render
  const start = Date.now();
  for (let i = 0; i < 50000000; i++) {
    Math.random();
  }
  const end = Date.now();

  const time = end - start;

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle>Expensive component</CardTitle>
        <CardDescription>This component took {time}ms to render</CardDescription>
      </CardHeader>
    </Card>
  );
};

const FooterCard = () => {
  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle>[Footer]</CardTitle>
        <CardDescription>Subtitle</CardDescription>
      </CardHeader>
    </Card>
  );
};

const HeaderCard = ({ username }: { username: string }) => {
  return (
    <Card>
      <CardHeader className="p-2">
        <CardTitle>[Header] ({username})</CardTitle>
        <CardDescription>Subtitle</CardDescription>
      </CardHeader>
    </Card>
  );
};
