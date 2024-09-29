import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import prisma from '@/lib/database'
import { MoreHorizontalIcon, PlusCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
async function getData() {
  const data = await prisma.product.findMany({
    orderBy: {
      images: 'desc',
    },
  })
  return data
}

export default async function ProductsPage() {
  const data = await getData()
  return (
    <>
      <div className="flex items-center justify-end">
        <Button
          asChild
          className="flex items-center gap-x-2 bg-black text-yellow-700 rounded-xl"
        >
          <Link href="/dashboard/products/create">
            <span>Add Zuma Products</span>
            <PlusCircle className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales perfomance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.images[0]}
                      alt="product name"
                      width={66}
                      height={71}
                      className="rounded-md object-cover h-16 w-"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>${item.priceStat}</TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreHorizontalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Link href={`/dashboard/products/${item.id}`}>
                            edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Link href={`/dashboard/products/${item.id}/delete`}>
                            delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
