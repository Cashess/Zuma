import prisma from '../../../lib/database'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card'

async function getData() { 
  try {
    const data = await prisma.order.findMany({
      select: {
        amount: true,
        id: true,
        user: {
          select: {
            firstName: true,
            profileImage: true,
            email: true,
            
          },
        },
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 7,
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return []; // Return an empty array or handle as needed
  }
}



export async function RecentSales() {
  const data = await getData();
  if (!data.length) {
    return <p>No recent sales found.</p>; // Handle no data state
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        {data.map((item) => (
          <div className="flex items-center gap-4" key={item.id}>
            <Avatar className="hidden sm:flex h-9 w-9">
              <AvatarImage src={item.user?.profileImage} alt="Avatar Image" />
              <AvatarFallback>
                {item.user?.firstName.slice(0, 3)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium">{item.user?.firstName}</p>
              <p className="text-sm text-muted-foreground">
                {item.user?.email}
              </p>
            </div>
            <p className="ml-auto font-medium">
              +${new Intl.NumberFormat('en-US').format(item.amount / 100)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
