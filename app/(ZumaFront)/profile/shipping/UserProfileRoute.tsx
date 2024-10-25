"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingAddressSchema } from '@/lib/validations';
import { saveShippingAddress } from '@/app/actions';
import { z } from 'zod';

interface iShippingProps {
  data: {
    id: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    userId: string; // Ensure to pass userId in props as well
  };
}

// Define a type for form values based on the schema
type ShippingFormValues = z.infer<typeof shippingAddressSchema>;

export function ShippingDetails({ data }: iShippingProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: {
      line1: data.line1,
      line2: data.line2 || '', // Default to an empty string if line2 is undefined
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country,
      id: data.id,
      userId: data.userId, // Include the user ID from props
    },
  });

  const onSubmit = async (formData: ShippingFormValues) => {
    const result = {
      id: formData.id,
      line1: formData.line1,
      line2: formData.line2 || undefined, // Ensure it is undefined if not provided
      city: formData.city,
      state: formData.state,
      postal_code: formData.postal_code,
      country: formData.country,
      userId: formData.userId, // Ensure userId is included
    };
  
    await saveShippingAddress(result);
    // Optionally, handle success (like revalidation or navigation)
  };
  
  

  return (
    <form id="shipping-address-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/profile">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold tracking-tight">Edit Shipping Address</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Shipping Address Details</CardTitle>
          <CardDescription>
            In this form, you can update your shipping address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                type="text"
                {...register('line1')}
                className="w-full"
                placeholder="Enter address line 1"
              />
              {errors.line1 && <p className="text-red-500">{errors.line1.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input
                type="text"
                {...register('line2')}
                className="w-full"
                placeholder="Enter address line 2 (optional)"
              />
              {errors.line2 && <p className="text-red-500">{errors.line2.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="city">City</Label>
              <Input
                type="text"
                {...register('city')}
                className="w-full"
                placeholder="Enter city"
              />
              {errors.city && <p className="text-red-500">{errors.city.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="state">State</Label>
              <Input
                type="text"
                {...register('state')}
                className="w-full"
                placeholder="Enter state"
              />
              {errors.state && <p className="text-red-500">{errors.state.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="postal_code">Postal Code</Label>
              <Input
                type="text"
                {...register('postal_code')}
                className="w-full"
                placeholder="Enter postal code"
              />
              {errors.postal_code && <p className="text-red-500">{errors.postal_code.message}</p>}
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="country">Country</Label>
              <Input
                type="text"
                {...register('country')}
                className="w-full"
                placeholder="Enter country"
              />
              {errors.country && <p className="text-red-500">{errors.country.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Shipping Address</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
