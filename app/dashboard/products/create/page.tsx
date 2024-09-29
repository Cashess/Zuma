'use client'
import { createZumaProduct } from '../../../actions'
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from '../../../../components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../../components/ui/card'
import { Input } from '../../../../components/ui/input'
import { Label } from '../../../../components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select'
import { Switch } from '../../../../components/ui/switch'
import { Textarea } from '../../../../components/ui/textarea'
import { UploadDropzone } from '../../../../lib/uploadthing'
import { ChevronLeft, XCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { productSchema } from '../../../../lib/validations'
import { useState } from 'react'
import Image from 'next/image'
import { categories } from '../../../../lib/categories'
import { SubmitButton } from '../../../components/SubmitButton'

export default function CreateProductPage() {
  const [images, setImages] = useState<string[]>([])
  const [lastResult, action] = useFormState(createZumaProduct, undefined)
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: productSchema })
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }
  return (
    <form id={form.id} onSubmit={form.onSubmit} action={action}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon">
          <Link href="/dashboard/products">
            <ChevronLeft className="w-4.5 h-4.5" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold tracking-tight">
          New Zuma Products
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Zuma Products Details</CardTitle>
          <CardDescription>
            here is product detailed description
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                type="text"
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={fields.name.initialValue}
                className="w-full"
                placeholder="Product Name"
              />
              <p className="text-red-800">{fields.name.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                placeholder="Detailed Zuma Product Description"
                key={fields.description.key}
                name={fields.description.name}
                defaultValue={fields.description.initialValue}
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>
            <div className="flex flex-col">
              <Label>Price</Label>

              <Input
                type="number"
                placeholder="$$"
                key={fields.priceStat.key}
                name={fields.priceStat.name}
                defaultValue={fields.priceStat.initialValue}
              />
              <p className="text-red-500">{fields.priceStat.errors}</p>
            </div>
            <div className=" flex flex-col gap-3 text-black">
              <Label>Featured Product</Label>
              <Switch
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
                defaultValue={fields.isFeatured.initialValue}
              />
              <p className="text-red-600">{fields.isFeatured.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                key={fields.category.key}
                name={fields.category.name}
                defaultValue={fields.category.initialValue}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-red-600"> {fields.category.errors}</p>
            </div>
            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <Input
                type="hidden"
                value={images}
                key={fields.images.key}
                name={fields.images.name}
                defaultValue={fields.images.initialValue as never}
              />
              {images.length > 0 ? (
                <div className="flex gap-5">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <Image
                        height={100}
                        width={100}
                        src={image}
                        alt="Product Image"
                        className="w-full h-full object-cover rounded-lg border"
                      />

                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white"
                      >
                        <XCircleIcon className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    setImages(res.map((r) => r.url))
                  }}
                  onUploadError={() => {
                    alert('Something went wrong')
                  }}
                />
              )}
              <p className="text-red-600">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text={'Create-product'} />
        </CardFooter>
      </Card>
    </form>
  )
}
