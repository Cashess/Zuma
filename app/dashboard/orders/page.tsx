import prisma from '@/lib/database';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { unstable_noStore } from 'next/cache';

async function getOrders() {
  const data = await prisma.order.findMany({
    select: {
      id: true,
      status: true,
      amount: true,
      createdAt: true,
      user: { // Fetch related user details
        select: {
          id: true,
          firstName: true,
          email: true,
          profileImage: true,
        },
      },
      shippingAddress: { // Fetch related shipping address details
        select: {
          line1: true,
          line2: true,
          city: true,
          state: true,
          postal_code: true,
          country: true,
        },
      },
      billingAddress: { // Fetch related billing address details
        select: {
          line1: true,
          line2: true,
          city: true,
          state: true,
          postal_code: true,
          country: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc', // Order results by creation date in descending order
    },
  });

  return data;
}

export default async function PurchasePage() {
  unstable_noStore();
  const data = await getOrders();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent Purchase from Zuma</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="font-medium">{item.user?.firstName}</p>
                  <p className="hidden md:flex text-sm text-muted-foreground">
                    {item.user?.email}
                  </p>
                </TableCell>
                <TableCell>Order</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat('en-US').format(item.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  ${new Intl.NumberFormat('en-US').format(item.amount / 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}


