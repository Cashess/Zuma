'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Orders',
    href: '/dashboard/orders',
  },
  {
    name: 'Products',
    href: '/dashboard/products',
  },
  {
    name: 'Banner',
    href: '/dashboard/banner',
  },
]

export function DashNavigation() {
  const pathname = usePathname()
  return (
    <>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={cn(
            link.href === pathname
              ? 'text-black'
              : 'text-muted-foreground hover:text-yellow-700'
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  )
}
