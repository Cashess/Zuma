'use server'

import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import { parseWithZod } from '@conform-to/zod'
import { bannerSchema, productSchema } from '../lib/validations'
import prisma from '@/lib/database'
import { redis } from '@/lib/redis'
import { Cart } from '@/lib/interface'
import { revalidatePath } from 'next/cache'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function createZumaProduct(
  prevState: unknown,
  formData: FormData
) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'aminugotie42@gmail.com') {
    return redirect('/')
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  const flattenUrls = submission.value.images.flatMap((urlString: string) =>
    urlString.split(',').map((url) => url.trim())
  )

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      priceStat: submission.value.priceStat,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  })

  redirect('/dashboard/products')
}

export async function editProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  // Check if the user is valid and has the correct email
  if (!user || user.email !== 'aminugotie42@gmail.com') {
    // Corrected email
    return redirect('/') // Stop further execution and redirect to home
  }

  // Parse form data with Zod validation
  const submission = parseWithZod(formData, {
    schema: productSchema,
  })

  // If the submission failed, return the reply
  if (submission.status !== 'success') {
    return submission.reply() // Early return on validation failure
  }

  // Handle images, flattening URLs
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(',').map((url) => url.trim())
  )

  const productId = formData.get('productId') as string

  // Update the product in the database
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      name: submission.value.name,
      description: submission.value.description,
      category: submission.value.category,
      priceStat: submission.value.priceStat,
      status: submission.value.status,
      images: flattenUrls,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  })

  // Revalidate the product page
  revalidatePath('/dashboard/products') // Fixed the typo in path

  // Redirect to the products dashboard
  return redirect('/dashboard/products') // Return redirect to stop further code execution
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'aminugotie42@gmail.com') {
    return redirect('/')
  }

  await prisma.product.delete({
    where: {
      id: formData.get('productId') as string,
    },
  })

  redirect('/dashboard/products')
}

export async function createBanner(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'aminugotie42@gmail.com') {
    return redirect('/')
  }

  const submission = parseWithZod(formData, {
    schema: bannerSchema,
  })

  if (submission.status !== 'success') {
    return submission.reply()
  }

  await prisma.banner.create({
    data: {
      title: submission.value.title,
      imageString: submission.value.imageString,
    },
  })
  revalidatePath('/dashboard/banner/create')
  redirect('/dashboard/banner')
}

export async function deleteBanner(formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email !== 'aminugotie42@gmail.com') {
    return redirect('/')
  }

  await prisma.banner.delete({
    where: {
      id: formData.get('bannerId') as string,
    },
  })

  redirect('/dashboard/banner')
}

export async function addItem(productId: string) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/')
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`)

  const selectedProduct = await prisma.product.findUnique({
    select: {
      id: true,
      name: true,
      priceStat: true,
      images: true,
    },
    where: {
      id: productId,
    },
  })

  if (!selectedProduct) {
    throw new Error('No product with this id')
  }
  let myCart = {} as Cart

  if (!cart || !cart.items) {
    myCart = {
      userId: user.id,
      items: [
        {
          priceStat: selectedProduct.priceStat,
          id: selectedProduct.id,
          imageString: selectedProduct.images[0],
          name: selectedProduct.name,
          quantity: 1,
        },
      ],
    }
  } else {
    let itemFound = false

    myCart.items = cart.items.map((item) => {
      if (item.id === productId) {
        itemFound = true
        item.quantity += 1
      }

      return item
    })

    if (!itemFound) {
      myCart.items.push({
        id: selectedProduct.id,
        imageString: selectedProduct.images[0],
        name: selectedProduct.name,
        priceStat: selectedProduct.priceStat,
        quantity: 1,
      })
    }
  }

  await redis.set(`cart-${user.id}`, myCart)

  revalidatePath('/', 'layout')
}

export async function delItem(formData: FormData) {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/')
  }

  const productId = formData.get('productId')

  const cart: Cart | null = await redis.get(`cart-${user.id}`)

  if (cart && cart.items) {
    const updateCart: Cart = {
      userId: user.id,
      items: cart.items.filter((item) => item.id !== productId),
    }

    await redis.set(`cart-${user.id}`, updateCart)
  }

  revalidatePath('/bag')
}

export async function checkOutPage() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user) {
    return redirect('/')
  }

  const cart: Cart | null = await redis.get(`cart-${user.id}`)

  if (cart && cart.items) {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cart.items.map((item) => ({
        price_data: {
          currency: 'usd',
          unit_amount: item.priceStat * 100,
          product_data: {
            name: item.name,
            images: [item.imageString],
          },
        },
        quantity: item.quantity,
      }))

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/payment/success'
          : 'https://Zuma-Shop.netlify.app/payment/success',
      cancel_url:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/payment/cancel'
          : 'https://Zuma-Shop.netlify.app/payment/cancel',
      metadata: {
        userId: user.id,
      },
    })

    return redirect(session.url as string)
  }
}
