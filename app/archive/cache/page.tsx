import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { superLongRequest } from './super-long-request';

export default async function page() {
  const result = await superLongRequest();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page</CardTitle>
        <CardDescription>Super long request result : {result}</CardDescription>
      </CardHeader>
    </Card>
  );
}
