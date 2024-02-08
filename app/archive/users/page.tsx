import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

type User = {
  email: string;
  id: number;
  image?: string;
};

const users: User[] = [
  {
    email: 'john.1@exemple.com',
    id: 1,
  },
  {
    email: 'jane.2@exemple.com',
    id: 2,
    image: 'https://i.pravatar.cc/300?u=jane.2@exemple',
  },
  {
    email: 'jack.3@exemple.com',
    id: 3,
  },
  {
    email: 'alice.4@exemple.com',
    id: 4,
  },
  {
    email: 'bob.5@exemple.com',
    id: 5,
  },
  {
    email: 'charlie.6@exemple.com',
    id: 6,
  },
  {
    email: 'david.7@exemple.com',
    id: 7,
    image: 'https://i.pravatar.cc/300?u=david.7@exemple',
  },
  {
    email: 'emma.8@exemple.com',
    id: 8,
  },
  {
    email: 'felix.9@exemple.com',
    id: 9,
    image: 'https://i.pravatar.cc/300?u=felix.9@exemple',
  },
  {
    email: 'grace.10@exemple.com',
    id: 10,
  },
  {
    email: 'henry.11@exemple.com',
    id: 11,
  },
  {
    email: 'isabel.12@exemple.com',
    id: 12,
  },
  {
    email: 'james.13@exemple.com',
    id: 13,
  },
];

export default function page() {
  return (
    <div className="mt-4 flex flex-wrap gap-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardHeader className="flex max-w-sm items-center gap-2 p-3">
            <UserAvatar email={user.email} image={user.image} />
            <CardTitle>{user.email}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

const UserAvatar = ({ email, image }: { email: string; image?: string }) => {
  return (
    <Avatar>
      <AvatarFallback>{email[0].toUpperCase()}</AvatarFallback>
      <AvatarImage
        src={
          image ?? `https://api.dicebear.com/7.x/pixel-art-neutral/svg?seed=${email}`
        }
      />
    </Avatar>
  );
};
