import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PropsWithChildren } from 'react';
import { superLongRequest } from './super-long-request';

export default async function Layout({ children }: PropsWithChildren) {
  const result = await superLongRequest();
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Layout</CardTitle>
        <CardDescription>Super long request result : {result}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
