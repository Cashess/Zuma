import { ProductCard } from '../../../components/storefront/ProductCard'
import prisma from '../../../../lib/database'
import { notFound } from 'next/navigation'
import { unstable_noStore as noStore } from 'next/cache'

async function getData(productCategory: string) {
  switch (productCategory) {
    case 'all': {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          priceStat: true,
          id: true,
          description: true,
        },
        where: {
          status: 'published',
        },
      })

      return {
        title: 'All Products',
        data: data,
      }
    }
    case 'electronics': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'electronics',
        },
        select: {
          name: true,
          images: true,
          priceStat: true,
          id: true,
          description: true,
        },
      })

      return {
        title: 'Products for electronics',
        data: data,
      }
    }
    case 'homeMadeCraft': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'homeMadeCraft',
        },
        select: {
          name: true,
          images: true,
          priceStat: true,
          id: true,
          description: true,
        },
      })

      return {
        title: 'Products to HomeMadeCraft',
        data: data,
      }
    }
    case 'kitchen': {
      const data = await prisma.product.findMany({
        where: {
          status: 'published',
          category: 'kitchen',
        },
        select: {
          name: true,
          images: true,
          priceStat: true,
          id: true,
          description: true,
        },
      })

      return {
        title: 'Products for Kitchen',
        data: data,
      }
    }
    default: {
      return notFound()
    }
  }
}

export default async function CategoriesPage({
  params,
}: {
  params: { name: string }
}) {
  noStore()
  const { data, title } = await getData(params.name)
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  )
}
